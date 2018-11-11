import axios from 'axios'
import lscache from 'lscache'
import axiosRetry from 'axios-retry'

let instance = axios.create({
  baseURL: '/api'
})
axiosRetry(instance, { retries: 3 })

let auth = {
  $auth: false,
  $isAdmin: false,
  $username: undefined
}
let oldAuth = false

let interval = async () => {
  lscache.flushExpired()
  auth.$auth = lscache.get('token') != null

  if (auth.$auth && !oldAuth) {
    try {
      const { data } = await instance.post('/info/isAdmin', { token: lscache.get('token') })

      if (data.code === 200) {
        auth.$isAdmin = data.admin
      } else {
        auth.$isAdmin = false
      }
    } catch (err) {
      auth.$isAdmin = false
    }

    try {
      const { data } = await instance.post('/info/getUsername', { token: lscache.get('token') })

      if (data.code === 200) {
        auth.$username = data.username
      } else {
        auth.$username = undefined
      }
    } catch (err) {
      auth.$username = undefined
    }
  }

  oldAuth = auth.$auth
}

setInterval(interval, 100)

export default auth
