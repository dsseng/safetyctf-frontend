<template>
<div>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
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
      <v-icon style='margin-right: 5px;'>account_circle</v-icon>
      <v-text-field
        label="Name"
        v-model="name"
        :error-messages="nameErrors"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
        required
      ></v-text-field>
    </v-layout>

    <v-layout row>
      <v-icon style='margin-right: 5px;'>account_circle</v-icon>
      <v-text-field
        label="Surname"
        v-model="surname"
        :error-messages="surnameErrors"
        @input="$v.surname.$touch()"
        @blur="$v.surname.$touch()"
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
      <v-icon style='margin-right: 5px;'>lock</v-icon>
      <v-text-field
        label="Confirm password"
        v-model="cPassword"
        :error-messages="cPasswordErrors"
        @input="$v.cPassword.$touch()"
        @blur="$v.cPassword.$touch()"
        required
        :append-icon="e2 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e2 = !e2)"
        :type="e2 ? 'password' : 'text'"
      ></v-text-field>
    </v-layout>

    <v-date-picker v-model="dob"></v-date-picker>

    <v-layout row style='margin-top: 10px;'>
      <v-btn @click="submit">register</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-layout>
  </form>
</div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required },
      surname: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      cPassword: { required, sameAsPassword: sameAs('password') }
    },

    data: () => ({
      email: '',
      password: '',
      cPassword: '',
      name: '',
      surname: '',
      e1: true,
      e2: true,
      err: false,
      dob: ''
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
        !this.$v.password.minLength && errors.push('Password is too short')
        return errors
      },
      cPasswordErrors () {
        const errors = []
        if (!this.$v.cPassword.$dirty) return errors
        !this.$v.cPassword.required && errors.push('Password confirmation is required')
        !this.$v.cPassword.sameAsPassword && errors.push('Passwords does not match')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required')
        return errors
      },
      surnameErrors () {
        const errors = []
        if (!this.$v.surname.$dirty) return errors
        !this.$v.surname.required && errors.push('Surname is required')
        return errors
      }
    },
    methods: {
      async submit () {
        this.$v.$touch()

        if (this.passwordErrors.length || this.cPasswordErrors.length || this.emailErrors.length || this.nameErrors.length || this.surnameErrors.length || !this.dob) return

        let result = await this.$http.post('/sauth/register', { username: this.email, password: this.password, name: this.name, surname: this.surname, dob: this.dob })

        if (result.data.code === 200) {
          this.$v.$reset()
          this.email = ''
          this.password = ''
          this.cPassword = ''
          this.name = ''
          this.surname = ''

          this.err = false
        } else {
          console.error(result.data)
          this.err = true
          this.submit()
        }
      },
      clear () {
        this.$v.$reset()
        this.email = ''
        this.password = ''
        this.cPassword = ''
        this.name = ''
        this.surname = ''
      }
    }
  }
</script>
