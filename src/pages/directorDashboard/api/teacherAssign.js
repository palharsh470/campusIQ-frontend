import api from "../../../api/axios";

export function postAssignTeacher(data) {
    return api.post("teacher/assignments/", data)
}
export function getAssignTeachers() {
    return api.get("teacher/assignments/")
}
export function deleteAssignTeacher(id) {
    return api.delete(`teacher/assignments/${id}/`)
}
export function updateAssignTeacher(id, data) {
    return api.patch(`teacher/assignments/${id}/`, data)
}