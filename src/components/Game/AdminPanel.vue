<template>
  <v-container v-if="auth.$auth && auth.$isAdmin">
    <h1 style="text-align: center;">{{ $t("message.welcome") }}</h1>
    <h2>{{ $t("message.taskEditor") }}</h2>
    <task-editor></task-editor>
  </v-container>
</template>

<script>
import TaskEditor from "./TaskEditor";
import auth from "../../auth";

export default {
  name: "AdminPanel",
  data: () => ({ auth }),
  components: {
    TaskEditor
  },
  i18n: {
    messages: {
      en: {
        message: {
          welcome: "Welcome to the admin panel!",
          taskEditor: "Task editor"
        }
      },
      ru: {
        message: {
          welcome: "Добро пожаловать в панель управления!",
          taskEditor: "Редактор задач"
        }
      }
    }
  }
};
</script>
