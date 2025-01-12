import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'https://edu-access-api.onrender.com/',
  baseURL: import.meta.env.VITE_APP_API,
  // baseURL: 'http://localhost:3001/',
  withCredentials: true
})
export default axiosInstance