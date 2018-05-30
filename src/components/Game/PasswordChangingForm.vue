<template>
<div>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
  </v-alert>

  <v-alert type="error" icon="lock" :value="invPass" transition="scale-transition">
    Invalid old password
  </v-alert>

  <form>
    <v-layout row>
      <v-icon style='margin-right: 5px;'>lock_open</v-icon>
      <v-text-field
        label="Old password"
        v-model="oldPassword"
        :error-messages="oldPasswordErrors"
        @input="$v.oldPassword.$touch()"
        @blur="$v.oldPassword.$touch()"
        required
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
      ></v-text-field>
    </v-layout>

    <v-layout row>
      <v-icon style='margin-right: 5px;'>lock</v-icon>
      <v-text-field
        label="New password"
        v-model="newPassword"
        :error-messages="newPasswordErrors"
        @input="$v.newPassword.$touch()"
        @blur="$v.newPassword.$touch()"
        required
        :append-icon="e2 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e2 = !e2)"
        :type="e2 ? 'password' : 'text'"
      ></v-text-field>
    </v-layout>

    <v-layout row>
      <v-icon style='margin-right: 5px;'>lock</v-icon>
      <v-text-field
        label="Confirm new password"
        v-model="confirmPassword"
        :error-messages="confirmPasswordErrors"
        @input="$v.confirmPassword.$touch()"
        @blur="$v.confirmPassword.$touch()"
        required
        :append-icon="e2 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e2 = !e2)"
        :type="e2 ? 'password' : 'text'"
      ></v-text-field>
    </v-layout>

    <v-layout row>
      <v-btn @click="submit">change password</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-layout>
  </form>
</div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      oldPassword: { required },
      newPassword: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAs: sameAs('newPassword') }
    },

    data: () => ({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      e1: true,
      e2: true,
      err: false,
      invPass: false
    }),

    computed: {
      oldPasswordErrors () {
        const errors = []
        if (!this.$v.oldPassword.$dirty) return errors
        !this.$v.oldPassword.required && errors.push('Old password is required')
        return errors
      },
      newPasswordErrors () {
        const errors = []
        if (!this.$v.newPassword.$dirty) return errors
        !this.$v.newPassword.required && errors.push('New password is required')
        !this.$v.newPassword.minLength && errors.push('New password is too short')
        return errors
      },
      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors
        !this.$v.confirmPassword.required && errors.push('Password confirmation is required')
        !this.$v.confirmPassword.sameAs && errors.push('Passwords does not match')
        return errors
      }
    },

    methods: {
      async submit () {
        this.$v.$touch()

        if (this.oldPasswordErrors.length || this.newPasswordErrors.length || this.newPasswordErrors.length) return

        let result = await this.$http.post('/auth/changePassword', { token: this.$getToken(), oldPassword: this.oldPassword, newPassword: this.newPassword })

        if (result.data.code === 200) {
          this.$v.$reset()
          this.oldPassword = ''
          this.newPassword = ''
          this.confirmPassword = ''

          this.err = false
          this.invPass = false
        } else if (result.data.code === 401) {
          this.invPass = true
          this.err = false
        } else if (result.data.code === 401) {
          this.err = false
          this.invPass = false
        } else {
          console.error(result.data)
          this.err = true
          this.invPass = false
          this.submit()
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
