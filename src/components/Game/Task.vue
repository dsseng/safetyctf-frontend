<template>
<div>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
  </v-alert>

  <v-alert type="error" icon="highlight_off" :value="inc" transition="scale-transition">
    Incorrect flag!
  </v-alert>

  <h1><a :href="task.url" target="_newtab">{{ solved ? '🔓':'🔒' }} {{ task.name }}</a></h1>
  <p>You will get {{ task.money }}$ and {{ task.experience }} experience</p>
  <p>Last changed: {{ task.added.replace('T', ' ').replace('Z', '') }}</p>
  <p>Made by: <router-link :to="'/game/user/' + task.by">{{ task.by }}</router-link></p>
  <p>
    Solved by (latest 10):
    <ul style='list-style: none'>
      <li v-for="un in task.solvedBy.reverse().slice(0, 9)" :key="un"><router-link :to="'/game/user/' + un">🌟 {{ un }}</router-link></li>
    </ul>
  </p>
  <form v-if="!solved && auth">
    <v-text-field
      label="Flag"
      v-model="flag"
      :error-messages="flagErrors"
      @input="$v.flag.$touch()"
      @blur="$v.flag.$touch()"
      required
    ></v-text-field>

    <v-btn @click="submit">submit</v-btn>
  </form>
</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    flag: { required, ctfFlag: value => value.search('ctf') !== -1 }
  },
  data () {
    return {
      flag: '',
      inc: false,
      err: false,
      solved: false,
      auth: false
    }
  },
  props: [ 'task' ],
  async created () {
    if (this.$getAuth()) {
      try {
        let result = await this.$http.post(this.$apiRoot + 'tasks/' + this.task.id + '/isSolved', { token: this.$getToken() })

        if (result.data.code === 200 && result.data.solved) this.solved = true
      } catch (err) {
        console.error(err)
        this.err = true
      }
    }

    let vm = this
    setInterval(() => {
      vm.auth = vm.$getAuth()
    }, 50)
  },
  computed: {
    flagErrors () {
      const errors = []
      if (!this.$v.flag.$dirty) return errors
      !this.$v.flag.required && errors.push('Flag is required')
      !this.$v.flag.ctfFlag && errors.push('Flag is not valid SafetyCTF flag')
      return errors
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()

      if (this.flagErrors.length !== 0) return

      try {
        let result = await this.$http.post(this.$apiRoot + 'tasks/' + this.task.id + '/solved', { token: this.$getToken(), flag: this.flag })

        console.log(result)
        if (result.data.code === 200) {
          this.$v.$reset()

          this.flag = ''
          this.solved = true

          this.err = false
          this.inc = false
        } else {
          switch (result.data.code) {
            case 404: {
              console.error(result.data)
              this.err = true
              this.inc = false
              break
            }
            case 418: {
              this.inc = true
              this.err = false
              break
            }
            default: {
              console.error(result.data)
              this.err = true
              this.inc = false
              break
            }
          }
        }
      } catch (err) {
        console.error(err)
        this.err = true
        this.inc = false
      }
    }
  }
}
</script>
