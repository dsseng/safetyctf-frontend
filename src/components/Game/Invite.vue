<template>
  <div>
    <h1>{{ $t('message.invite') }}</h1>
    {{ $t('message.text') }}
    <v-btn v-clipboard:copy="msg">{{ $t('message.copy') }}</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Invite',
  props: ['username'],
  computed: {
    msg () {
      return 'https://safetyctf.ddns.net/#/game/invited/' + this.username
    }
  },
  i18n: {
    messages: {
      en: {
        message: {
          invite: 'Invite your friends',
          copy: 'copy link!',
          text: 'You can invite your friends 👩 👨 to the SafetyCTF! If your friend registered through this link 👉, you and your friend will get 15$ 🤑🤑 and 15 points of experience ✨✨!'
        }
      },
      ru: {
        message: {
          invite: 'Приглашайте своих друзей',
          copy: 'скопировать ссылку!',
          text: 'Вы можете приглашать своих друзей 👩 👨 в SafetyCTF! Если ваш друг зарегистрируется по этой ссылке 👉, вы и ваш друг поличите по 15$ 🤑🤑 и 15 опыта ✨✨!'
        }
      }
    }
  }
}
</script>
