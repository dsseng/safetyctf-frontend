<template>
  <div>
    <h1>Invite your friends!</h1>
    You can invite your friends 👩 👨 to the SafetyCTF! If your friend registered through this link 👉, you and your friend will get 15$ 🤑🤑 and 15 points of experience ✨✨!
    <v-btn v-clipboard:copy="message">copy link!</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Invite',
  props: ['username'],
  computed: {
    message () {
      return 'https://safetyctf.ddns.net/#/game/invited/' + this.username
    }
  }
}
</script>
