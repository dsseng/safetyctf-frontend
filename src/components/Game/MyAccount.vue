<template>
<div>
  <v-layout column align-center justify-center>
    <login-form></login-form>
    <h1>-OR-</h1>
    <register-form></register-form>
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
  }
}
</script>
