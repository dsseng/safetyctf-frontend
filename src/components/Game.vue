<template>
<v-app :dark="dark" :light="!dark">
  <v-toolbar>
    <v-toolbar-title>⚡️SafetyCTF👨‍💻👩‍💻</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/"><v-icon>home</v-icon>Home</v-btn>
      <v-btn flat @click="switchDark"><v-icon>invert_colors</v-icon>{{ dark ? 'Dark' : 'Light' }} theme</v-btn>
      <lang-switch></lang-switch>
      <v-btn flat @click="logout" v-if="auth.$auth"><v-icon>exit_to_app</v-icon>Log out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-navigation-drawer fixed app>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <!--<v-list-tile-title class="title">
            SafetyCTF
          </v-list-tile-title>-->

          <logo width='225' heigth='62.5' :isVertical='false'></logo>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile to="/game/myaccount">
        <v-list-tile-action>
          <v-icon>fingerprint</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>My account</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/game/tasks">
        <v-list-tile-action>
          <v-icon>code</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Tasks</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if='auth.$auth && auth.$isAdmin' to="/game/admin">
        <v-list-tile-action>
          <v-icon>supervisor_account</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Admin panel</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/game/leaderboard">
        <v-list-tile-action>
          <v-icon>stars</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Leaderboard</v-list-tile-title>
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
import LangSwitch from './Game/LangSwitch'
import Logo from './Logo'
import auth from '../auth'

export default {
  components: { LangSwitch, Logo },
  data () {
    return {
      dark: false,
      auth
    }
  },
  mounted () {
    this.dark = this.$ls.get('dark') || false

    let vm = this
    this.$el.onclick = function () {
      vm.refreshToken()
    }
  },
  methods: {
    switchDark () {
      this.dark = !this.dark
      this.$ls.set('dark', this.dark) // Save to localStorage
    },
    async refreshToken () {
      if (this.$getTokenExp() && this.$getToken()) {
        let result = await this.$http.post(this.$apiRoot + 'auth/refreshToken', { token: this.$getToken() })

        if (result.data.code === 200) {
          this.$ls.set('token', result.data.token, 60)
          this.$ls.set('token-exp', 1, 55)
        }
      }
    },
    logout () {
      this.$ls.remove('token')
      this.$ls.remove('token-exp')
    }
  }
}
</script>
