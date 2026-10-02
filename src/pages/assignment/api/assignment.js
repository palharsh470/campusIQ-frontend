import api from "../../../api/axios"

export function listAssignments(params){
    return api.get("assignments", { params })
}

export function createAssignment(payload) {
    return api.post("assignments/", payload)
}

export function updateAssignment(id, payload) {
    return api.patch(`assignments/${id}/`, payload)
}

export function generateAssignmentQuestions(payload) {
    return api.post("assignments/generate-questions/", payload)
}

export function submitAssignment(id, payload) {
    return api.post(`assignments/${id}/submit/`, payload)
}