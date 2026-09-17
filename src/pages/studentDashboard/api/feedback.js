import api from "../../../api/axios";

export function postFeedback(data){
    return api.post("feedback/submit/", data)
}
export function getLastFeedback(enrollment){
    console.log(enrollment)
    return api.get(`feedback/last?enrollment=${enrollment?.id}`)
}