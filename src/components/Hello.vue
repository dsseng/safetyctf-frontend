<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>⚡️<logo width='112.5' heigth='31.25' :isVertical='false' style='display: inline-block; vertical-align: middle;'></logo> 👨‍💻👩‍💻</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <lang-switch></lang-switch>
      </v-toolbar-items>
    </v-toolbar>
    <v-alert color="error" icon="signal_cellular_connected_no_internet_4_bar" :value="connErr" transition="scale-transition">
      {{ $t('message.error') }}
    </v-alert>
    <v-parallax src="static/img/602727-background-city-1920x1200-windows-7.jpg" height="600">
      <v-layout
        column
        align-center
        justify-center
        class="yellow--text"
      >
        <h1 class="yellow--text mb-2 display-1 text-xs-center">{{ $t('message.welcome') }}</h1>
        <div class="subheading mb-3 text-xs-center">{{ $t('message.descr') }}</div>
        <v-btn
          class="blue lighten-2 mt-5"
          dark
          large
          to="/game"
        >
          {{ $t('message.getStarted') }}
        </v-btn>
      </v-layout>
    </v-parallax>
    <v-layout row wrap justify-space-around>
      <v-flex xs12 md3>
        <v-card>
          <v-card-media src="static/img/148573-best-hacking-wallpaper-1920x1080.jpg" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ $t('message.manyPlayers') }}</h3>
              <div>{{ $tc('message.users', usersTotal, { count: usersTotal }) }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" to="/game">{{ $t('message.beOne') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-media src="static/img/80891-math-background-1920x1200-meizu.jpg" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ $t('message.manyTasks') }}</h3>
              <div>{{ $tc('message.tasks', tasksTotal, { count: tasksTotal }) }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="green" to="/game">{{ $t('message.solve') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card>
          <v-card-media src="static/img/677680-new-cool-math-backgrounds-1920x1080-high-resolution.jpg" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ $t('message.interesting') }}</h3>
              <div>{{ $t('message.made') }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="red" to="/game">{{ $t('message.super') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <section>
      <v-container>
        <p>
          {{ $t('message.competition') }}
        </p>
        <p>
          {{ $t('message.if') }}
        </p>
      </v-container>
    </section>
  </v-app>
</template>

<script>
import anime from 'animejs'
import LangSwitch from './Game/LangSwitch'
import Logo from './Logo'

export default {
  name: 'hello',
  components: { LangSwitch, Logo },
  i18n: {
    messages: {
      en: {
        message: {
          error: 'It seems to be some connection problems',
          welcome: '⚡️Welcome to SafetyCTF!👨‍💻👩‍💻',
          getStarted: 'Get started!🎉',
          descr: 'Hello, this is a competition in hacking and IT safety🔒🔓',
          manyPlayers: 'Many👨‍💻players around the world',
          interesting: 'Interesting tasks made by true hackers',
          made: 'SafetyCTF\'s tasks are made by realy cool hackers!😎',
          tasks: 'In total, SafetyCTF has {count} task | In total, SafetyCTF has {count} tasks',
          users: 'In total, SafetyCTF has {count} user | In total, SafetyCTF has {count} users',
          beOne: 'Get Started and be one of them!😎',
          solve: 'Get Started and solve them!🔓',
          super: 'Get Started and solve this super tasks!🔐',
          competition: 'SafetyCTF is a competition in hacking‍ 💻 and IT safety 🔒🔓. CTF is "Capture The Flag". You need to solve tasks 📜 to get flags, codes starting with $ctf.',
          if: 'If you have solved task, you will get money 💵 and experience ✨.',
          manyTasks: 'Many📜tasks'
        }
      },
      ru: {
        message: {
          error: 'Похоже, произошла ошибка соединения',
          welcome: '⚡️Добро пожаловать в SafetyCTF!👨‍💻👩‍💻',
          getStarted: 'Поехали!🎉',
          descr: 'Привет, это соревнование по взлому и информационной безопасности🔒🔓',
          manyPlayers: 'Большое количество👨‍💻игроков по всему миру',
          interesting: 'Интересные задачи, созданные настоящими хакерами',
          made: 'Задачи SafetyCTF созданы действительно крутыми хакерами!😎',
          tasks: 'В SafetyCTF существует {count} задача | В SafetyCTF существует {count} задач',
          users: 'В SafetyCTF зарегистрирован {count} пользователь | В SafetyCTF зарегистрировано {count} пользователей',
          beOne: 'Участвуй и будь одним из них!😎',
          solve: 'Участвуй и решай их!🔓',
          super: 'Участвуй и решай эти классные испытания!🔐',
          competition: 'SafetyCTF --  соревнование  по‍ взлому 💻 и информационной безопасности 🔒🔓. CTF -- "Capture The Flag". Чтобы получить флаги (коды, начинающиеся с $ctf), нужно решать задачи (таски) 📜',
          if: 'Если вы решили задачу, вы получите деньги 💵 и опыт ✨.',
          manyTasks: 'Много📜заданий'
        }
      }
    }
  },
  data () {
    return {
      tasksTotal: 0,
      usersTotal: 0,
      connErr: false
    }
  },
  async created () {
    try {
      let usersAndTasks = await this.$http.get(this.$apiRoot + 'stats/usersAndTasks')

      if (usersAndTasks.data.code === 200) {
        let vm = this
        anime({
          targets: vm,
          usersTotal: usersAndTasks.data.usersCount,
          tasksTotal: usersAndTasks.data.tasksCount,
          duration: 1000,
          easing: 'linear',
          round: 1
        })
        this.connErr = false
      } else {
        console.log(usersAndTasks.data)
        this.connErr = true
      }
    } catch (err) {
      console.log(err)
      this.connErr = true
    }
  }
}
</script>
