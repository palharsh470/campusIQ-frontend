import api from "../../../api/axios";

export  function getFeedback(filter) {
  return api.get(`feedback`, {params : filter})
}
