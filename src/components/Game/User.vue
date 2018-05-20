<template>
<div>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
  </v-alert>
  <v-alert type="error" icon="not_interesting" :value="nf" transition="scale-transition">
    User not found
  </v-alert>

  <h1>{{ user.name }} {{ user.surname }} ({{ user.username }})</h1>
  <p>Role (capabilities): {{ user.role }}</p>
  <p>Money: {{ user.money }}$</p>
  <p>Experience: {{ user.experience }}</p>
  <p>Registered at: {{ user.registerDate.replace('T', ' ').replace('Z', '') }}</p>
  <p>Date of birth: {{ user.dob }}</p>
  <p>
    Friends:
    <ul style='list-style: none'>
      <li v-for="fr in user.friends" :key="fr"><router-link :to="'/game/user/' + fr">🌟 {{ fr }}</router-link></li>
    </ul>
  </p>
  <p>Solved tasks:</p>
  <v-layout row justify-space-around>
    <task v-for="task in tasksSolved" :key="task.id" :task="task"></task>
  </v-layout>
</div>
</template>

<script>
import Task from './Task'

export default {
  components: { Task },
  data () {
    return {
      user: {},
      err: false,
      nf: false,
      tasksSolved: []
    }
  },
  props: [ 'username' ],
  async created () {
    try {
      let result = await this.$http.get(this.$apiRoot + 'auth/' + this.username + '/info')

      if (result.data.code === 200) {
        if (!result.data.user) {
          this.nf = true
          this.err = false
        } else {
          this.nf = false
          this.err = false

          this.user = result.data.user
          this.tasksSolved = result.data.tasksSolved
        }
      } else {
        this.err = true
        this.nf = false
      }
    } catch (err) {
      console.error(err)
      this.err = true
      this.nf = false
    }
  },
  watch: {
    async username () {
      try {
        let result = await this.$http.get(this.$apiRoot + 'auth/' + this.username + '/info')

        if (result.data.code === 200) {
          if (!result.data.user) {
            this.nf = true
            this.err = false
          } else {
            this.nf = false
            this.err = false

            this.user = result.data.user
            this.tasksSolved = result.data.tasksSolved
          }
        } else {
          this.err = true
          this.nf = false
        }
      } catch (err) {
        console.error(err)
        this.err = true
        this.nf = false
      }
    }
  }
}
</script>
