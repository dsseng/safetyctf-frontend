<template>
<div>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    It seems to be some connection problems
  </v-alert>

  <v-dialog v-model="dialog" max-width="500px">
    <v-btn slot="activator" color="primary" dark class="mb-2">New Task</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.name" label="Task name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.money" label="Money"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.experience" label="Experience"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.url" label="URL"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.flag"
                label="Flag"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-data-table
    :headers="headers"
    :items="tasks"
    :pagination.sync="pagination"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.money }}</td>
      <td>{{ props.item.experience }}</td>
      <td>{{ props.item.solvedBy.length }}</td>
      <td><a :href="props.item.url" target="_newtab">{{ props.item.url }}</a></td>
      <td class="justify-center layout px-0">
        <v-btn icon class="mx-0" @click="edit(props.item)">
          <v-icon color="teal">edit</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</div>
</template>

<script>
export default {
  name: 'TaskEditor',
  data: () => ({
    tasks: [],
    err: false,
    e1: true,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'ID', value: 'id' },
      { text: 'Money', value: 'money' },
      { text: 'Experience', value: 'experience' },
      { text: 'Solved by', value: 'solvedBy.length' },
      { text: 'URL', value: 'url' }
    ],
    pagination: { sortBy: 'solvedBy', descending: true },
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: '',
      id: '',
      money: 0,
      experience: 0,
      flag: '',
      url: ''
    },
    defaultItem: {
      name: '',
      id: '',
      money: 0,
      experience: 0,
      flag: '',
      url: ''
    }
  }),
  async created () {
    try {
      let result = await this.$http.get(this.$apiRoot + 'tasks/')

      if (result.data.code === 200) {
        this.tasks = result.data.tasks
      } else {
        console.error(result.data)
        this.err = true
      }
    } catch (err) {
      console.error(err)
      this.err = true
    }
  },
  methods: {
    edit (item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.e1 = true
      }, 300)
    },
    async save () {
      if (this.editedIndex > -1) {
        try {
          let result = await this.$http.patch(this.$apiRoot + 'tasks/' + this.editedItem.id, Object.assign({ token: this.$getToken() }, this.editedItem))

          if (result.data.code === 200) {
            Object.assign(this.tasks[this.editedIndex], this.editedItem)
          } else {
            console.error(result.data)
            this.err = true
          }
        } catch (err) {
          console.error(err)
          this.err = true
        }
      } else {
        try {
          let result = await this.$http.post(this.$apiRoot + 'tasks/', Object.assign({ token: this.$getToken() }, this.editedItem))

          if (result.data.code === 201) {
            this.tasks.push(this.editedItem)
          } else {
            console.error(result.data)
            this.err = true
          }
        } catch (err) {
          console.error(err)
          this.err = true
        }
      }
      this.close()
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
    }
  }
}
</script>
