import api from "../../../api/axios"

export function getEnrolledStudent(id) {
  return api.get("enrollments")
}

