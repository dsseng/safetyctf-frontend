import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      // Add some global translations
    }
  },
  ru: {
    message: {
      // Add some global translations
    }
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

export default i18n
