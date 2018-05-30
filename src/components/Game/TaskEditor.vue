<template>
<div v-if='auth.$auth && auth.$isAdmin'>
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
              <v-text-field
                v-model="editedItem.name"
                :error-messages="nameErrors"
                label="Name"
                required
                @input="$v.editedItem.name.$touch()"
                @blur="$v.editedItem.name.$touch()"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.id"
                label="ID"
                required
                @input="$v.editedItem.id.$touch()"
                @blur="$v.editedItem.id.$touch()"
                :error-messages="idErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.money"
                label="Money"
                required
                @input="$v.editedItem.money.$touch()"
                @blur="$v.editedItem.money.$touch()"
                :error-messages="moneyErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.experience"
                label="Experience"
                required
                @input="$v.editedItem.experience.$touch()"
                @blur="$v.editedItem.experience.$touch()"
                :error-messages="experienceErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.url"
                label="URL"
                required
                @input="$v.editedItem.url.$touch()"
                @blur="$v.editedItem.url.$touch()"
                :error-messages="urlErrors"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="editedItem.flag"
                label="Flag"
                required
                @input="$v.editedItem.flag.$touch()"
                @blur="$v.editedItem.flag.$touch()"
                :error-messages="flagErrors"
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
import auth from '../../auth'
import { validationMixin } from 'vuelidate'
import { required, url, between } from 'vuelidate/lib/validators'
import swal from 'sweetalert2'

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
    },
    auth
  }),
  async created () {
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
      console.error(err)
      this.err = true
      swal('Oops, there is a problem!', 'Failed to get tasks\' list', 'error')
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
      this.$v.$touch()

      if (this.nameErrors.length || this.flagErrors.length || this.urlErrors.length || this.idErrors.length || this.moneyErrors.length || this.experienceErrors.length) return

      if (this.editedIndex > -1) {
        try {
          let result = await this.$http.patch('/tasks/' + this.editedItem.id, Object.assign({ token: this.$getToken() }, this.editedItem))

          if (result.data.code === 200) {
            Object.assign(this.tasks[this.editedIndex], this.editedItem)
            swal('Good job!', `${this.editedItem.name} successfully edited`, 'success')
          } else {
            console.error(result.data)
            this.err = true
            swal('Oops, there is a problem!', `Failed to edit ${this.editedItem.name}`, 'error')
          }
        } catch (err) {
          console.error(err)
          this.err = true
          swal('Oops, there is a problem!', `Failed to edit ${this.editedItem.name}`, 'error')
        }
      } else {
        try {
          let result = await this.$http.post('/tasks/', Object.assign({ token: this.$getToken() }, this.editedItem))

          if (result.data.code === 201) {
            this.tasks.push(this.editedItem)
            swal('Good job!', `${this.editedItem.name} successfully added`, 'success')
          } else {
            console.error(result.data)
            this.err = true
            swal('Oh no, an error occured!', `Failed to add ${this.editedItem.name}`, 'error')
          }
        } catch (err) {
          console.error(err)
          this.err = true
          swal('Oh no, an error occured!', `Failed to add ${this.editedItem.name}`, 'error')
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
  mixins: [ validationMixin ],
  validations: {
    editedItem: {
      name: { required },
      flag: { required, ctfFlag: value => (value.search('ctf') !== -1) },
      url: { required, url },
      id: { required },
      money: { required, between: between(5, 500) },
      experience: { required, between: between(5, 500) }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
    },
    nameErrors () {
      const errors = []
      if (!this.$v.editedItem.name.$dirty) return errors
      !this.$v.editedItem.name.required && errors.push('Name is required')
      return errors
    },
    flagErrors () {
      const errors = []
      if (!this.$v.editedItem.flag.$dirty) return errors
      !this.$v.editedItem.flag.required && errors.push('Flag is required')
      !this.$v.editedItem.flag.ctfFlag && errors.push('Entered flag is not valid SafetyCTF flag')
      return errors
    },
    urlErrors () {
      const errors = []
      if (!this.$v.editedItem.url.$dirty) return errors
      !this.$v.editedItem.url.required && errors.push('URL is required')
      !this.$v.editedItem.url.url && errors.push('Entered URL is not valid URL')
      return errors
    },
    idErrors () {
      const errors = []
      if (!this.$v.editedItem.id.$dirty) return errors
      !this.$v.editedItem.id.required && errors.push('ID is required')
      return errors
    },
    moneyErrors () {
      const errors = []
      if (!this.$v.editedItem.money.$dirty) return errors
      !this.$v.editedItem.money.required && errors.push('Money reward is required')
      !this.$v.editedItem.money.between && errors.push('Money reward isn\'t in 5-500$ range')
      return errors
    },
    experienceErrors () {
      const errors = []
      if (!this.$v.editedItem.experience.$dirty) return errors
      !this.$v.editedItem.experience.required && errors.push('Experience reward is required')
      !this.$v.editedItem.experience.between && errors.push('Experience reward isn\'t in 5-500 points range')
      return errors
    }
  }
}
</script>
