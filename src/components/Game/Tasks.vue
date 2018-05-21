<template>
<div>
  <v-container>
    <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
      It seems to be some connection problems
    </v-alert>
    <v-layout row justify-space-around>
      <task v-for="task in tasks" :key="task.id" :task="task"></task>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import Task from './Task'

export default {
  components: { Task },
  data () {
    return {
      auth: false,
      tasks: [],
      err: false
    }
  },
  async created () {
    try {
      let result = await this.$http.get(this.$apiRoot + 'tasks/')

      if (result.data.code === 200) {
        this.tasks = result.data.tasks
        setInterval(() => {
          this.auth = this.$getAuth()
        }, 50)
      } else {
        console.error(result.data)
        this.err = true
      }
    } catch (err) {
      console.error(err)
      this.err = true
    }
  }
}
</script>
