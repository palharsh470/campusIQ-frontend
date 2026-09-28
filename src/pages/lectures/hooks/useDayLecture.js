import { useFetch } from "../../../hooks/useFetch";
import { useRetrieve } from "../../../hooks/useRetrieve";
import { listDayLecture } from "../api/lectures";

export function useDayLecture(day_number, classGroupId){
    const filter = { day : day_number}
    if (classGroupId)  filter.class_group =classGroupId
    return useFetch(listDayLecture, "listDayLecture", filter)
}