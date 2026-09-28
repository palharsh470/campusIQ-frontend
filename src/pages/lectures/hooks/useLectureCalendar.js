import { useFetch } from "../../../hooks/useFetch";
import { getLectureCalendar } from "../api/lectures";

export function useLectureCalendar(classGroupId){
    const filter = classGroupId ? { class_group: classGroupId } : {}
    return useFetch(getLectureCalendar, "lectureCalendar", filter)
}