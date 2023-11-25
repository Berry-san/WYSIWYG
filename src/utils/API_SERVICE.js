import axios from 'axios'

const WEB_BASE = 'http://payv2.zworld.ng/index.php/v1/api/'

const axiosInstance = axios.create({
  baseURL: WEB_BASE,
  headers: {
    'x-api-key': 987654,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export default axiosInstance
