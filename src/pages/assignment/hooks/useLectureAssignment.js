import { useFetch } from "../../../hooks/useFetch"
import { listAssignments } from "../api/assignment"

export function useLectureAssignment(lectureId){
    return useFetch(listAssignments, "lectureAssignments", {"lecture" : lectureId})
}