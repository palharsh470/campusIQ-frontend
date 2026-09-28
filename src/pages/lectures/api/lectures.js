import api from "../../../api/axios"

export function getLectureCalendar(params={}){
  return api.get("lectures/calendar/", { params })
}

export function listDayLecture(params){
  return api.get("lectures/", { params })
}

export function postLectures(data) {
  return api.post("lectures/", data)
}
