import api from "../../../api/axios"

export function registerOrg(data){
    return api.post("/org/register/", data)
}
export function login(data){
    return api.post("/token/", data)
}
export function fetchMe(){
    return api.get("/me/")
}