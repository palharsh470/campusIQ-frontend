import api from "../../../api/axios";

export function getNotificationList(){
    return api.get("notifications/")
}
export function markNotificationsRead(payload){
    return api.post("notifications/mark-read/", payload)
}