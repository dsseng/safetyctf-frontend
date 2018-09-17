<template>
<div>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
  </v-alert>
  <v-alert type="error" icon="not_interesting" :value="nf" transition="scale-transition">
    User not found
  </v-alert>

  <h1>{{ user.name }} {{ user.surname }} ({{ user.username }})</h1>
  <p v-if="user.role === 'admin'">🌟 Admin</p>
  <p><v-icon>money</v-icon> {{ user.money }}$</p>
  <p><v-icon>star</v-icon> {{ user.experience }}</p>
  <p><v-icon>how_to_reg</v-icon> {{ user.registerDate | datetime }}</p>
  <p><v-icon>cake</v-icon> {{ user.dob.replace('-', '.').replace('-', '.') }}</p>
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
  filters: {
    datetime: x => {
      return x.substring(0, x.indexOf('.')).replace('T', ' ').replace('Z', '').replace('-', '.').replace('-', '.')
    }
  },
  data () {
    return {
      user: {},
      err: false,
      nf: false,
      tasksSolved: []
    }
  },
  props: [ 'username' ],
  created () {
    this.getAccount(false)
  },
  methods: {
    async getAccount (isUpdated) {
      try {
        const { data } = await this.$http.get('/info/' + this.username)

        if (data.code === 200) {
          if (!data.user) {
            this.nf = true
            this.err = false
            if (isUpdated) this.$swal('There is no such user!', 'This user does not exist!', 'error')
          } else {
            this.nf = false
            this.err = false

            this.user = data.user
            this.tasksSolved = data.tasksSolved
          }
        } else {
          this.err = true
          this.nf = false
          if (isUpdated) this.$swal('Ouch!', 'Failed to get info about this user!', 'error')
        }
      } catch (err) {
        if (this.retries < 3) {
          console.error(err)
          this.getAccount()
          this.retries++
        } else {
          console.error(err)
          this.err = true
          this.nf = false
          if (isUpdated) this.$swal('Ouch!', 'Failed to get info about this user!', 'error')
        }
      }
    }
  },
  watch: {
    username () {
      this.retries = 0
      this.getAccount(true)
    }
  }
}
</script>
