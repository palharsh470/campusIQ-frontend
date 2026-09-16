import api from "../../../api/axios"

export function getLectures() {
  return api.get("lectures")
}

