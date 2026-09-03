import api from "./axios"

export function registerOrg(data){
    return api.post("/register-org/", data)
}
export function login(data){
    return api.post("/token/", data)
}
export function fetchMe(){
    return api.get("/me/")
}