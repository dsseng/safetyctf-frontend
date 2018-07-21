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
    <v-layout row>
      <v-icon style='margin-right: 5px;'>email</v-icon>
      <v-text-field
        label="E-mail"
        v-model="email"
        :error-messages="emailErrors"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        required
      ></v-text-field>
    </v-layout>

    <v-layout row>
      <v-icon style='margin-right: 5px;'>lock</v-icon>
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
    </v-layout>

    <v-layout row>
      <v-btn @click="submit">log in</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-layout>
  </form>
</div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import swal from 'sweetalert2'
  import lscache from 'lscache'

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

        try {
          const { data } = await this.$http.post('/auth/login', { username: this.email, password: this.password })

          if (data.code === 200) {
            lscache.set('token', data.token, 60)
            lscache.set('token-exp', 1, 55)

            this.$v.$reset()
            this.email = ''
            this.password = ''

            this.err = false
            this.invPass = false
            this.notFound = false
          } else if (data.code === 401) {
            this.invPass = true
            this.err = false
            this.notFound = false
            swal('Hmm...', 'I think, you forgot your password!', 'error')
          } else if (data.code === 404) {
            this.notFound = true
            this.err = false
            this.invPass = false
            swal('There is no such user!', 'This user does not exist!', 'error')
          } else {
            console.error(data)
            this.err = true
            this.invPass = false
            this.notFound = false
            swal('Oops!', 'Login failed.', 'error')
            this.submit()
          }
        } catch (e) {
          this.err = true
          this.invPass = false
          this.notFound = false
          console.error(e)
          swal('Oops!', 'The server is not responding! Login failed.', 'error')
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
