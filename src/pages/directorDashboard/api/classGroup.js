import api from "../../../api/axios";

export function addClassGroup(data) {
    return api.post("class-groups/", data)
}
export function getClassGroup() {
    return api.get("class-groups/")
}
export function retriveClassGroup(id) {
    return api.get(`class-groups/${id}/`)
}
export function deleteClassGroup(id) {
    return api.delete(`class-groups/${id}/`)
}
export function updateClassGroup(id, data) {
    return api.patch(`class-groups/${id}/`, data)
}
