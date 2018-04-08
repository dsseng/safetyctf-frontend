<template>
<div>
  <v-container>
    <div v-if="!this.auth">
      <h1>Log in</h1>
      <login-form></login-form>
      <h1>-OR-</h1>
      <h1>Register</h1>
      <register-form></register-form>
    </div>
    <div v-if="this.auth">
      <User :username="username"></user>
      <h1>Change password</h1>
      <password-changing-form></password-changing-form>
    </div>
  </v-container>
</div>
</template>

<script>
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import PasswordChangingForm from './PasswordChangingForm'
import User from './User'

export default {
  components: {
    LoginForm,
    RegisterForm,
    PasswordChangingForm,
    User
  },
  data () {
    return {
      auth: false,
      username: ''
    }
  },
  async created () {
    let vm = this
    setInterval(() => {
      vm.auth = vm.$getAuth()
    }, 50)

    if (vm.$getAuth()) {
      try {
        let result = await this.$http.post(this.$apiRoot + 'auth/getUsername', { token: this.$getToken() })

        if (result.data.code === 200) this.username = result.data.username
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
