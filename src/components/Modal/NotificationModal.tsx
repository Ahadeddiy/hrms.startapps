import React from "react";
import {
  X,
  Cake,
  UserPlus,
  CalendarCheck,
  PartyPopper,
  Bell,
  Check,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  message: string;
  time: string;
  type: "birthday" | "leave" | "new_user" | "anniversary" | "general";
  isRead: boolean;
}

interface NotificationModalProps {
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const getIconForType = (type: Notification["type"]) => {
  switch (type) {
    case "birthday":
      return <Cake className="text-pink-500" size={18} />;
    case "leave":
      return <CalendarCheck className="text-green-500" size={18} />;
    case "new_user":
      return <UserPlus className="text-blue-500" size={18} />;
    case "anniversary":
      return <PartyPopper className="text-yellow-500" size={18} />;
    default:
      return <Bell className="text-gray-400" size={18} />;
  }
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  onClose,
  notifications,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead,
}) => {
  return (
    <div className="fixed top-16 right-6 z-50 w-80 bg-white rounded-xl shadow-xl border border-gray-300">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h2 className="font-bold text-[#113F67]">Notifications</h2>
        <div className="flex items-center gap-3">
          {notifications.some((n) => !n.isRead) && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          )}
          <button onClick={onClose} className="text-[#113F67]">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 flex gap-3 items-start ${
                n.isRead ? "opacity-60" : "bg-blue-50"
              }`}
            >
              <div className="pt-1">{getIconForType(n.type)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#113F67]">
                  {n.message}
                </p>
                <p className="text-xs text-gray-500">{n.time}</p>
                {!n.isRead && (
                  <button
                    onClick={() => onMarkAsRead(n.id)}
                    className="text-xs text-blue-600 hover:underline mt-1"
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <button
                onClick={() => onDelete(n.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
