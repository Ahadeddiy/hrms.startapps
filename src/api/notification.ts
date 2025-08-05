import API from "./auth";
export const fetchNotifications = async (userId:string) => {
    console.log(userId)
    try{
        const response = await API.get(`/api/notifications/${userId}`)
        console.log(response)
        return response.data
    }
    catch (error){
        console.log("fetch notification error",error)
        throw error;
    }

}
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const res = await API.patch(`/api/notifications/read/${notificationId}`);
    return res.data;
  } catch (error) {
    console.error("Mark as read failed:", error);
    throw error;
  }
};
export const markAllNotificationsAsRead = async (userId) => {
  try {
    const res = await API.patch(`/api/notifications/${userId}/read-all`);
    return res.data;
  } catch (error) {
    console.error("Mark all as read failed:", error);
    throw error;
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    const res = await API.delete(`/api/notifications/${notificationId}`);
    return res.data;
  } catch (error) {
    console.error("Delete notification failed:", error);
    throw error;
  }
};
