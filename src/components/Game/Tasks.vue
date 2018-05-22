<template>
<div>
  <v-container>
    <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
      It seems to be some connection problems
    </v-alert>

    <v-select
      :items="[
        'Experience',
        'Money',
        'Popularity'
      ]"
      v-model="sortingBy"
      label="Sort tasks by"
      single-line
    ></v-select>
    <v-layout row justify-space-around>
      <task v-for="task in sortedTasks" :key="task.id" :task="task"></task>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import Task from './Task'

export default {
  components: { Task },
  data () {
    return {
      auth: false,
      tasks: [],
      err: false,
      sortingBy: 'Experience'
    }
  },
  async created () {
    try {
      let result = await this.$http.get(this.$apiRoot + 'tasks/')

      if (result.data.code === 200) {
        this.tasks = result.data.tasks
        setInterval(() => {
          this.auth = this.$getAuth()
        }, 50)
      } else {
        console.error(result.data)
        this.err = true
      }
    } catch (err) {
      console.error(err)
      this.err = true
    }
  },
  computed: {
    sortedTasks () {
      let items = this.tasks
      let i = 0
      let j = 0

      switch (this.sortingBy) {
        case 'Experience':
          for (i = 0; i < items.length; i++) {
            let value = items[i]
            // store the current item value so it can be placed right
            for (j = i - 1; j > -1 && items[j].experience < value.experience; j--) {
              // loop through the items in the sorted array (the items from the current to the beginning)
              // copy each item to the next one
              items[j + 1] = items[j]
            }
            // the last item we've reached should now hold the value of the currently sorted item
            items[j + 1] = value
          }
          break
        case 'Money':
          for (i = 0; i < items.length; i++) {
            let value = items[i]
            // store the current item value so it can be placed right
            for (j = i - 1; j > -1 && items[j].money < value.money; j--) {
              // loop through the items in the sorted array (the items from the current to the beginning)
              // copy each item to the next one
              items[j + 1] = items[j]
            }
            // the last item we've reached should now hold the value of the currently sorted item
            items[j + 1] = value
          }
          break
        case 'Popularity':
          for (i = 0; i < items.length; i++) {
            let value = items[i]
            // store the current item value so it can be placed right
            for (j = i - 1; j > -1 && items[j].solvedBy.length < value.solvedBy.length; j--) {
              // loop through the items in the sorted array (the items from the current to the beginning)
              // copy each item to the next one
              items[j + 1] = items[j]
            }
            // the last item we've reached should now hold the value of the currently sorted item
            items[j + 1] = value
          }
          break
        default:
      }

      return items
    }
  }
}
</script>
