<template>
<div>
  <v-layout column align-center justify-center>
    <div v-if="!this.auth">
      <login-form></login-form>
      <h1>-OR-</h1>
      <register-form></register-form>
    </div>
    <div v-if="this.auth">
      <h1>Hello, World!</h1>
    </div>
  </v-layout>
</div>
</template>

<script>
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default {
  components: {
    LoginForm,
    RegisterForm
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
