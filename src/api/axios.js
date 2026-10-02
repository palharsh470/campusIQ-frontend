import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const api = axios.create({
  baseURL: `${baseUrl}/api`,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function SuccessContainer(response) {
  return response
}

async function ErrorContainer(error) {
  const originalReq = error.config

  if (error?.response?.status === 401 && !originalReq._retry) {
    originalReq._retry = true

    try {
      const refreshToken = localStorage.getItem("refresh_token")
      if (!refreshToken) {
        throw new Error("No RefreshToken")
      }

      const response = await axios.post(
        `${baseUrl}/api/token/refresh/`,
        {
          "refresh": refreshToken,
        }
      );

      const newaccessToken = response.data.access;
      localStorage.setItem("access_token", newaccessToken)
      originalReq.headers.Authorization = `Bearer ${newaccessToken}`

      return api(originalReq)
    }
    catch (refreshError) {
      console.log("Refresh token failed:", refreshError);

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");

      throw refreshError;
    }
  }

  return Promise.reject(error)
}

api.interceptors.response.use(
  SuccessContainer, ErrorContainer
)

export default api