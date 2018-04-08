<template>
  <v-container>
    <user :username="$route.params.username"></user>
  </v-container>
</template>

<script>
import User from './User'

export default {
  components: { User }
}
</script>

<style>

</style>
