<template>
<div>
  <v-container>
    <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
      {{ $t('message.err') }}
    </v-alert>

    <v-select
      :items="[
        $t('message.experience'),
        $t('message.money'),
        $t('message.popularity')
      ]"
      v-model="sortingBy"
      :label="$t('message.sortBy')"
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
import swal from 'sweetalert2'

export default {
  components: { Task },
  i18n: {
    messages: {
      en: {
        message: {
          experience: 'Experience',
          money: 'Money',
          popularity: 'Popularity',
          sortBy: 'Sort tasks by',
          err: 'It seems to be some connection problems'
        }
      },
      ru: {
        message: {
          experience: 'Опыту',
          money: 'Деньгам',
          popularity: 'Популярности',
          sortBy: 'Сортировать задания по',
          err: 'Похоже, произошла ошибка соединения'
        }
      }
    }
  },
  data () {
    return {
      tasks: [],
      err: false,
      sortingBy: 'Experience',
      retries: 0
    }
  },
  methods: {
    async getTasks () {
      try {
        let result = await this.$http.get('/tasks/')

        if (result.data.code === 200) {
          this.tasks = result.data.tasks
        } else {
          console.error(result.data)
          this.err = true
          swal('Oops, there is a problem!', 'Failed to get tasks\' list', 'error')
        }
      } catch (err) {
        if (this.retries < 3) {
          console.error(err)
          this.getTasks()
          this.retries++
        } else {
          console.error(err)
          this.err = true
          swal('Oops, there is a problem!', 'Failed to get tasks\' list', 'error')
        }
      }
    }
  },
  created () {
    this.getTasks()
  },
  computed: {
    sortedTasks () {
      let items = this.tasks
      let i = 0
      let j = 0

      switch (this.sortingBy) {
        case this.$t('message.experience'):
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
        case this.$t('message.money'):
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
        case this.$t('message.popularity'):
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
