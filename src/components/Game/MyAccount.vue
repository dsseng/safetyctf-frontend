<template>
<div>
  <v-container>
    <div v-if="!auth.$auth">
      <h1>Log in</h1>
      <login-form></login-form>
      <h1>Register</h1>
      <register-form></register-form>
    </div>
    <div v-if="auth.$auth">
      <user :username="auth.$username"></user>
      <invite :username='auth.$username'></invite>
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
import Invite from './Invite'
import auth from '../../auth'

export default {
  components: {
    LoginForm,
    RegisterForm,
    PasswordChangingForm,
    User,
    Invite
  },
  data: () => ({ auth })
}
</script>
