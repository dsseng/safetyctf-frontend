<template>
<div>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
  </v-alert>

  <v-data-table
    :headers="headers"
    :items="users"
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
</div>
</template>

<script>
export default {
  name: 'Leaderboard',
  data: () => ({
    headers: [
      { text: 'Name', value: 'username' },
      { text: 'Experience', value: 'experience' },
      { text: 'Money', value: 'money' },
      { text: 'Solved tasks', value: 'tasksSolved.length' },
      { text: 'Friends', value: 'friends.length' }
    ],
    users: [],
    err: false
  }),
  async created () {
    try {
      let result = await this.$http.get(this.$apiRoot + 'stats/leaderboard')

      if (result.data.code === 200) this.users = result.data.users
    } catch (err) {
      console.error(err)
      this.err = true
    }
  }
}
</script>
