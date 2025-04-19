import { FileText, Calendar } from "lucide-react"

export default function NotificationList() {
  const notifications = [
    {
      id: 1,
      message:
        "We're pleased to inform you that a new customer has registered! Please follow up promptly by contacting.",
      time: "Just Now",
      type: "document",
    },
    {
      id: 2,
      message:
        "Hello Sales Marketing Team! We have a special offer for our customers! Enjoy a 20% discount on selected.",
      time: "30 min ago",
      type: "document",
    },
    {
      id: 3,
      message:
        "Hello Sales Marketing Team, This is a reminder to achieve this month's sales target. Currently, we've...",
      time: "2 days ago",
      type: "document",
    },
    {
      id: 4,
      message: "Hello Sales Marketing Team, We've received a product information request from a potential customer.",
      time: "5 days ago",
      type: "calendar",
    },
    {
      id: 5,
      message: "Hello Sales Marketing Team, We've received a product information request from a potential customer.",
      time: "07 Feb, 2024",
      type: "document",
    },
    {
      id: 6,
      message: "Hello Sales Marketing Team, A meeting or presentation has been scheduled with a customer/prospect.",
      time: "01 Feb, 2024",
      type: "document",
    },
    {
      id: 7,
      message: "Hello Sales Marketing Team, This is a reminder to review the contract or proposal currently under...",
      time: "28 Jan, 2024",
      type: "document",
    },
    {
      id: 8,
      message:
        "Hello Sales Marketing Team, It's time for a follow-up with a customer after their recent purchase/meeting.",
      time: "27 Jan, 2024",
      type: "calendar",
    },
    {
      id: 9,
      message: "Hello Sales Marketing Team, We've received positive feedback/testimonial from a satisfied customer...",
      time: "26 Jan, 2024",
      type: "document",
    },
    {
      id: 10,
      message: "Hello Sales Marketing Team, This is a reminder regarding an outstanding payment from a customer....",
      time: "25 Jan, 2024",
      type: "calendar",
    },
  ]

  return (
    <div className="space-y-4 border rounded-lg overflow-hidden">
      {notifications.map((notification) => (
        <div
          key={notification.id}
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
            <p className="text-sm text-gray-800">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
