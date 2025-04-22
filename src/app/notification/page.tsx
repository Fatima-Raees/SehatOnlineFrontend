"use client";

import { useState, useEffect } from "react";
import { FileText, Calendar } from "lucide-react";
import Cookies from "js-cookie";
import { fetchNotifications } from "@/APIServices/Notification/notifications"; // adjust import path as needed

interface Notification {
  notificationID: number;
  receiverName: string;
  message: string;
  timeSent: string;
  type: "document" | "calendar";
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Optional: set person ID (usually done on login or server-side)
  Cookies.set("PersonID", "7", { expires: 1 });

  const getPersonIdFromCookie = () => {
    const cookies = document.cookie.split(';');
    const personIdCookie = cookies.find(cookie => cookie.trim().startsWith('PersonID='));
    return personIdCookie ? parseInt(personIdCookie.split('=')[1]) : null;
  };

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      setError(null);
      const personId = getPersonIdFromCookie();

      if (!personId) {
        setError("Person ID not found. Please log in.");
        setLoading(false);
        return;
      }

      const result = await fetchNotifications(personId);
      if (!result.success) {
        setError(result.message);
      } else {
        const formatted: Notification[] = result.data.map((item: any) => ({
          notificationID: item.notificationID,
          receiverName: item.receiverName,
          message: item.message,
          timeSent: new Date(item.timeSent).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          type: item.type as "document" | "calendar",
        }));
        setNotifications(formatted);
      }
      setLoading(false);
    }

    loadNotifications();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </div>
      <div className="space-y-4 border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading notifications...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.notificationID}
              className="flex items-start gap-3 p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {notification.type === "document" ? (
                  <div className="h-6 w-6 flex items-center justify-center rounded-sm border border-gray-300">
                    <FileText className="h-4 w-4 text-gray-500" />
                  </div>
                ) : (
                  <div className="h-6 w-6 flex items-center justify-center rounded-sm border border-gray-300">
                    <Calendar className="h-4 w-4 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">{notification.receiverName}</span>: {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.timeSent}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No notifications available.</div>
        )}
      </div>
    </div>
  );
}
