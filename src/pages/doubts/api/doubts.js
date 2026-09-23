import api from "../../../api/axios";

export function listDoubts(params = {}) {
    return api.get("doubts/", { params })
}

export function retriveDoubt(id) {
    return api.get(`doubts/${id}/`)
}

export function createDoubt(formData) {
    return api.post('doubts/', formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export function postMessage(doubtId, formData){
    return api.post(`doubts/${doubtId}/messages/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
}

export function toggleDoubtLike(doubtId){
    return api.post(`doubts/${doubtId}/like/`)
}

export function toggleMessageLike(doubtId, messageId){
    return api.post(`doubts/${doubtId}/messages/${messageId}/like/`)
}

export function acceptMessage(doubtId, messageId){
    return api.post(`doubts/${doubtId}/messages/${messageId}/accept/`)
}