import api from "../../../api/axios";

export function enrollStudent(data) {
    return api.post("student/register/", data)
}