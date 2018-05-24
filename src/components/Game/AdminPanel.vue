<template>
  <div v-if="auth && isAdmin">
    <h1>
      Welcome at the admin panel!
    </h1>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data: () => ({
    auth: false,
    isAdmin: false
  }),
  async created () {
    let vm = this

    setInterval(() => {
      vm.auth = vm.$getAuth()
    }, 50)

    if (this.$getAuth()) {
      try {
        let result = await this.$http.post(this.$apiRoot + 'info/isAdmin', { token: this.$getToken() })

        if (result.data.code === 200) {
          this.isAdmin = result.data.admin
        }
      } catch (err) {}
    }
  }
}
</script>
