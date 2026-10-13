
import {usePost} from "../../../hooks/usePost"
import { sendAnnouncement } from "../api/announcement"

export function useSendAnnouncement(){
return usePost(sendAnnouncement)
}