import React from "react";
import { X, Cake, UserPlus, CalendarCheck, PartyPopper, Bell } from "lucide-react";
interface Notification {
  id: string;
  message: string;
  time: string;
  type: "birthday" | "leave" | "new_user" | "anniversary" | "general";
}

interface NotificationModalProps {
  onClose: () => void;
  notifications: Notification[];
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
}) => {
  return (
    <div className="fixed top-16 right-6 z-50 w-80 bg-white rounded-xl shadow-xl border border-gray-300">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h2 className="font-bold text-[#113F67]">Notifications</h2>
        <button onClick={onClose} className="text-sm text-[#113F67] cursor-pointer font-bold">
          <X size={18} />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-100 flex gap-3 items-start">
              <div className="pt-1">{getIconForType(n.type)}</div>
              <div>
                <p className="text-sm font-semibold text-[#113F67]">{n.message}</p>
                <p className="text-xs text-gray-500">{n.time}</p>
              </div>
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
