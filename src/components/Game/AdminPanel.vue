<template>
<v-container v-if="auth.$auth && auth.$isAdmin">
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
import auth from '../../auth'

export default {
  name: 'AdminPanel',
  data: () => ({ auth }),
  components: {
    TaskEditor
  }
}
</script>
