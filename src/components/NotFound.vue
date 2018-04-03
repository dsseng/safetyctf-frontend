<template>
  <v-layout
    column
    align-center
    justify-center
    class="blue--text"
    style="width: 100%; height: 100vh;"
  >
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
export default {

}
</script>
