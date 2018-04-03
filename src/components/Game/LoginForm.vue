<template>
<div>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
  </v-alert>

  <v-alert type="error" icon="lock" :value="invPass" transition="scale-transition">
    Invalid password
  </v-alert>

  <v-alert type="error" icon="account_circle" :value="notFound" transition="scale-transition">
    User not found
  </v-alert>

  <form>
    <v-text-field
      label="E-mail"
      v-model="email"
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      :error-messages="passwordErrors"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      required
      :append-icon="e1 ? 'visibility' : 'visibility_off'"
      :append-icon-cb="() => (e1 = !e1)"
      :type="e1 ? 'password' : 'text'"
    ></v-text-field>
    <v-divider></v-divider>
    <v-btn @click="submit">log in</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      email: { required, email },
      password: { required }
    },

    data: () => ({
      email: '',
      password: '',
      e1: true,
      err: false,
      invPass: false,
      notFound: false
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
      }
    },

    methods: {
      async submit () {
        this.$v.$touch()

        if (this.passwordErrors.length || this.emailErrors.length) return

        let result = await this.$http.post(this.$apiRoot + 'auth/login', { username: this.email, password: this.password })

        if (result.data.code === 200) {
          this.$ls.set('token', result.data.token, 60)
          this.$ls.set('token-exp', 1, 55)

          this.$v.$reset()
          this.email = ''
          this.password = ''

          this.err = false
          this.invPass = false
          this.notFound = false
        } else if (result.data.code === 401) {
          this.invPass = true
          this.err = false
          this.notFound = false
        } else if (result.data.code === 404) {
          this.notFound = true
          this.err = false
          this.invPass = false
        } else {
          console.error(result.data)
          this.err = true
          this.invPass = false
          this.notFound = false
        }
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.password = ''
      }
    }
  }
</script>
