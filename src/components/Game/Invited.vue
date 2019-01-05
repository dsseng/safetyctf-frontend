<template>
  <v-container>
    <register-form :invitedBy="$route.params.invitedBy"></register-form>
  </v-container>
</template>

<script>
import RegisterForm from "./RegisterForm";

export default {
  name: "Invited",
  components: {
    RegisterForm
  }
};
</script>
