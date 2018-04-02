<template>
  <v-app>
    <v-alert color="error" icon="signal_cellular_connected_no_internet_4_bar" :value="connErr" transition="scale-transition">
      It seems to be some connection problems
    </v-alert>
    <v-parallax src="static/img/602727-background-city-1920x1200-windows-7.jpg" height="600">
      <v-layout
        column
        align-center
        justify-center
        class="yellow--text"
      >
        <h1 class="yellow--text mb-2 display-1 text-xs-center">⚡️Welcome to SafetyCTF!👨‍💻👩‍💻</h1>
        <div class="subheading mb-3 text-xs-center">Hello, this is competition in hacking and IT safety🔒🔓</div>
        <v-btn
          class="blue lighten-2 mt-5"
          dark
          large
          to="/game"
        >
          Get Started
        </v-btn>
      </v-layout>
    </v-parallax>
    <v-layout row wrap justify-space-around>
      <v-flex xs12 md3>
        <v-card>
          <v-card-media src="static/img/148573-best-hacking-wallpaper-1920x1080.jpg" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Many👨‍💻players</h3>
              <div>In total, SafetyCTF has {{ usersTotal }} player(s)</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" to="/game">Get Started and be one of them!😎</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-media src="static/img/80891-math-background-1920x1200-meizu.jpg" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Many📜tasks</h3>
              <div>In total, SafetyCTF has {{ tasksTotal }} task(s)</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="green" to="/game">Get Started and solve them!🔓</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-media src="static/img/677680-new-cool-math-backgrounds-1920x1080-high-resolution.jpg" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Interesting tasks made by true hackers</h3>
              <div>SafetyCTF's tasks are made by realy cool hackers!😎</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="red" to="/game">Get Started and solve this super tasks!🔐</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'hello',
  data () {
    return {
      tasksTotal: 0,
      usersTotal: 0,
      connErr: false
    }
  },
  async created () {
    try {
      let usersAndTasks = await (await fetch(this.$apiRoot + 'info/usersAndTasks')).json()

      if (usersAndTasks.code === 200) {
        /* this.usersTotal = usersAndTasks.usersCount
        this.tasksTotal = usersAndTasks.tasksCount */
        let vm = this
        anime({
          targets: vm,
          usersTotal: usersAndTasks.usersCount,
          tasksTotal: usersAndTasks.tasksCount,
          duration: 1000,
          easing: 'linear'
        })
      } else {
        console.log(usersAndTasks)
        this.connErr = true
      }
    } catch (err) {
      console.log(err)
      this.connErr = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
