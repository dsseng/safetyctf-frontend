<template>
<div>
  <v-layout column align-center justify-center>
    <div v-if="!this.auth">
      <h1>Log in</h1>
      <login-form></login-form>
      <h1>-OR-</h1>
      <h1>Register</h1>
      <register-form></register-form>
    </div>
    <div v-if="this.auth">
      <h1>Change password</h1>
      <password-changing-form></password-changing-form>
    </div>
  </v-layout>
</div>
</template>

<script>
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import PasswordChangingForm from './PasswordChangingForm'

export default {
  components: {
    LoginForm,
    RegisterForm,
    PasswordChangingForm
  },
  data () {
    return {
      auth: false
    }
  },
  created () {
    let vm = this
    setInterval(() => {
      vm.auth = vm.$getAuth()
    }, 50)
  }
}
</script>
