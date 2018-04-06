<template>
<div>
  <v-container v-if="this.auth">
    <v-layout row justify-space-around>
      <div>asd</div>
      <div>asd</div>
      <div>asd</div>
      <div>asd</div>
      <div>asd</div>
      <div>asd</div>
      <div>asd</div>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      auth: false,
      admin: false
    }
  },
  created () {
    setInterval(() => {
      this.auth = this.$getAuth()
      if (!this.auth) this.$router.push('/game/myaccount')
    }, 50)
  }
}
</script>

<style>

</style>
