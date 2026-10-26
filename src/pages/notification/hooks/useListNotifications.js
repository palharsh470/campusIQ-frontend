import { useFetch } from "../../../hooks/useFetch";
import { getNotificationList } from "../api/notification";

export function useListNotifications(){
    return useFetch(getNotificationList, "notificationList")
}