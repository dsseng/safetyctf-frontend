import axios from 'axios'
import lscache from 'lscache'

const $apiRoot = 'https://safetyctf.ddns.net/api/' // modify this, if you have API server at another address
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
      let result = await axios.post($apiRoot + 'info/isAdmin', { token: lscache.get('token') })

      if (result.data.code === 200) {
        auth.$isAdmin = result.data.admin
      } else {
        auth.$isAdmin = false
      }
    } catch (err) {
      auth.$isAdmin = false
    }

    try {
      let result = await axios.post($apiRoot + 'auth/getUsername', { token: lscache.get('token') })

      if (result.data.code === 200) {
        auth.$username = result.data.username
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
