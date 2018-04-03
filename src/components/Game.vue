<template>
<v-app :dark="dark" :light="!dark">
  <v-toolbar>
    <v-toolbar-title>⚡️SafetyCTF👨‍💻👩‍💻</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/"><v-icon>home</v-icon>Home</v-btn>
      <v-btn flat @click="switchDark"><v-icon>invert_colors</v-icon>{{ dark ? 'Dark' : 'Light' }} theme</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-navigation-drawer fixed app>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            SafetyCTF
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile to="/game/auth">
        <v-list-tile-action>
          <v-icon>fingerprint</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>My account</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-content>
    <router-view></router-view>
  </v-content>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      dark: false
    }
  },
  created () {
    this.$router.push('/game/myaccount')
    this.dark = this.$ls.get('dark') || false
  },
  methods: {
    switchDark () {
      this.dark = !this.dark
      this.$ls.set('dark', this.dark) // Save to localStorage
    }
  }
}
</script>
