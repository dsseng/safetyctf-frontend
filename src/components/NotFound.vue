<template>
  <v-layout
    column
    align-center
    justify-center
    class="blue--text"
    style="width: 100%; height: 100vh;"
  >
    <div class="term">
      <span class="typed"></span>
    </div>

    <h1 class="blue--text mb-2 display-1 text-xs-center">🤬☹️Hmm... Page not found</h1>
    <v-btn
      class="blue lighten-2 mt-5"
      dark
      large
      to="/"
    >
      Home page
    </v-btn>
    <v-btn
      class="blue lighten-2 mt-5"
      dark
      large
      @click="$router.go(-1)"
    >
      Go back
    </v-btn>
  </v-layout>
</template>

<script>
import Typed from 'typed.js'

export default {
  async mounted () {
    var ip = (await this.$http.get('//icanhazip.com/')).data
    ip = ip.substring(0, ip.length - 1) // Remove \n

    /* eslint-disable no-new */
    new Typed('.typed', {
      strings: ['wget https://safetyctf.com' + this.$route.path + '^1000\n`--' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '--  https://safetyctf.com' + this.$route.path + '`^1000 \n`Resolving safetyctf.com`^750.^750.^750. ^1000 `' + ip + '` ^1000\n`Connecting to safetyctf.com|' + ip + '|:80`^750.^750.^750. `connected.`\n`HTTP request sent, awaiting response`^750.^750.^750. `404 Not Found`\n`' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' ERROR 404: Not Found.`'],
      typeSpeed: 40,
      backSpeed: 0,
      loop: true
    })
  }
}
</script>

<style scoped>
.term {
  background-color: #333;
  color: white;
  width: 30rem;
  height: 10rem;
}

.typed {
  white-space: pre;
}
.typed::before {
  content: '$ ';
  color: lightgreen;
}
</style>
