import api from "../../../api/axios";

export function sendAnnouncement(payload){
    return api.post("announcements/send/", payload)
}