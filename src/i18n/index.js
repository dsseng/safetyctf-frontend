import Vue from "vue";
import VueI18n from "vue-i18n";
import hello from "./hello";

Vue.use(VueI18n);

const messages = {
  en: {
    hello: hello.en
  },
  ru: {
    hello: hello.ru
  }
};

const i18n = new VueI18n({
  locale: "en",
  messages
});

export default i18n;
