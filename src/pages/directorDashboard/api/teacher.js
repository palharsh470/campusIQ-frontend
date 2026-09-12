import api from "../../../api/axios";

export function postTeacher(data) {
    return api.post("teachers/", data)
}
export function getTeachers() {
    return api.get("teachers/")
}
export function deleteTeacher(id) {
    return api.delete(`teachers/${id}/`)
}
export function updateTeacher(id, data) {
    return api.patch(`teachers/${id}/`, data)
}