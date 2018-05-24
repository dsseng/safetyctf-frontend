<template>
<v-container v-if="auth && isAdmin">
  <h1 style="text-align: center;">
    Welcome to the admin panel!
  </h1>
  <h2>
    Task editor
  </h2>
  <task-editor></task-editor>
</v-container>
</template>

<script>
import TaskEditor from './TaskEditor'

export default {
  name: 'AdminPanel',
  data: () => ({
    auth: false,
    isAdmin: false
  }),
  components: {
    TaskEditor
  },
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
