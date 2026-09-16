import api from "../../../api/axios"

export function getLectures(classId) {
  return api.get(`lectures?class_group=${classId}`)
}
export function postLectures(data) {
  return api.post("lectures/", data)
}

