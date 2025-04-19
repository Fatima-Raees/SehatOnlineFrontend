import NotificationList from "@/components/notifications/notification-list";

export default function NotificationsPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </div>

      <NotificationList />
    </div>
  )
}
