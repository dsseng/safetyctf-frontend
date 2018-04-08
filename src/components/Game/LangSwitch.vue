<template>
  <v-btn flat @click="switchLang"><v-icon>g_translate</v-icon>{{ lang }}</v-btn>
</template>

<script>
export default {
  methods: {
    switchLang () {
      switch (this.lang) {
        case 'English': {
          this.lang = 'Русский'
          this.$i18n.locale = 'ru'
          break
        }

        case 'Русский': {
          this.lang = 'English'
          this.$i18n.locale = 'en'
          break
        }
      }

      this.$ls.set('lang', this.lang) // Save to localStorage
    }
  },
  created () {
    this.lang = this.$ls.get('lang') || 'English'

    switch (this.lang) {
      case 'English': {
        this.$i18n.locale = 'en'
        break
      }

      case 'Русский': {
        this.$i18n.locale = 'ru'
        break
      }
    }
  },
  data () {
    return {
      lang: 'English'
    }
  }
}
</script>

<style>

</style>
