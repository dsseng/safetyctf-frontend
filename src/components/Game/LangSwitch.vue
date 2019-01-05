<template>
  <v-btn flat @click="switchLang"><v-icon>g_translate</v-icon>{{ lang }}</v-btn>
</template>

<script>
export default {
  data() {
    return {
      lang: "English"
    };
  },
  methods: {
    switchLang() {
      switch (this.lang) {
        case "English": {
          this.lang = "Русский";
          this.$i18n.locale = "ru";
          break;
        }

        case "Русский": {
          this.lang = "English";
          this.$i18n.locale = "en";
          break;
        }
      }
      localStorage.setItem("lang", this.lang); // Save to localStorage
    }
  },
  created() {
    if (localStorage.getItem("lang")) {
      this.lang = localStorage.getItem("lang");
    } else {
      this.lang = "English"; // English is default language
      this.$i18n.locale = "en";
    }

    if (this.lang === "Русский") {
      this.$i18n.locale = "ru";
    }
  }
};
</script>
