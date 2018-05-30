<template>
<v-container>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
  </v-alert>

  <v-data-table
    :headers="headers"
    :items="users"
    :pagination.sync="pagination"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td><router-link :to="'/game/user/' + props.item.username">{{ props.item.username }}</router-link></td>
      <td>{{ props.item.experience }}</td>
      <td>{{ props.item.money }}</td>
      <td>{{ props.item.tasksSolved.length }}</td>
      <td>{{ props.item.friends.length }}</td>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
export default {
  name: 'Leaderboard',
  i18n: {
    messages: {
      en: {
        message: {
          name: 'Name',
          experience: 'Experience',
          money: 'Money',
          solved: 'Solved tasks',
          friends: 'Friends'
        }
      },
      ru: {
        message: {
          name: 'Имя',
          experience: 'Опыт',
          money: 'Деньги',
          solved: 'Задач решено',
          friends: 'Друзей'
        }
      }
    }
  },
  computed: {
    headers: function () {
      return [
        { text: this.$t('message.name'), value: 'username', sortable: false },
        { text: this.$t('message.experience'), value: 'experience' },
        { text: this.$t('message.money'), value: 'money' },
        { text: this.$t('message.solved'), value: 'tasksSolved.length' },
        { text: this.$t('message.friends'), value: 'friends.length' }
      ]
    }
  },
  data: () => ({
    pagination: { sortBy: 'experience', descending: true },
    users: [],
    err: false
  }),
  async created () {
    try {
      let result = await this.$http.get('/stats/leaderboard')

      if (result.data.code === 200) this.users = result.data.users
    } catch (err) {
      console.error(err)
      this.err = true
    }
  }
}
</script>
