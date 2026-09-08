import api from "../../../api/axios";

export function launchProgram(data) {
    return api.post("programs/", data)
}

export function listProgram(data) {
    return api.get("programs/")
}

export function deleteProgram(id) {
    return api.delete(`programs/${id}/`)
}

export function editProgram(id, data) {
    return api.patch(`programs/${id}/`, data)
}