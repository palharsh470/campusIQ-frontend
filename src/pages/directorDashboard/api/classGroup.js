import api from "../../../api/axios";

export function addClassGroup(data) {
    return api.post("class-groups/", data)
}