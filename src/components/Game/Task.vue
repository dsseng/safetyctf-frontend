<template>
<div style='padding: 0 10px'>
  <v-alert type="error" icon="signal_cellular_connected_no_internet_4_bar" :value="err" transition="scale-transition">
    {{ $t('message.err') }}
  </v-alert>

  <v-alert type="error" icon="highlight_off" :value="inc" transition="scale-transition">
    {{ $t('message.inc') }}
  </v-alert>

  <h1><a :href="task.url" target="_newtab">{{ solved ? '🔓':'🔒' }} {{ task.name }}</a></h1>
  <p>{{ $t('message.get') }} {{ task.money }}$ {{ $t('message.and') }} {{ task.experience }} {{ $t('message.experience') }}</p>
  <p>{{ $t('message.lastchanged') }}: {{ task.added.replace('T', ' ').replace('Z', '') }}</p>
  <p>{{ $t('message.madeby') }}: <router-link :to="'/game/user/' + task.by">{{ task.by }}</router-link></p>
  <p>
    {{ $t('message.solved') }}:
    <ul style='list-style: none'>
      <li v-for="un in task.solvedBy.reverse().slice(0, 9)" :key="un"><router-link :to="'/game/user/' + un">🌟 {{ un }}</router-link></li>
    </ul>
  </p>
  <form v-if="!solved && auth.$auth">
    <v-text-field
      :label="$t('message.flag')"
      v-model="flag"
      :error-messages="flagErrors"
      @input="$v.flag.$touch()"
      @blur="$v.flag.$touch()"
      required
    ></v-text-field>

    <v-btn @click="submit">{{ $t('message.submit') }}</v-btn>
  </form>
</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import auth from '../../auth'
import swal from 'sweetalert2'

export default {
  mixins: [validationMixin],
  i18n: {
    messages: {
      en: {
        message: {
          madeby: 'Made by',
          lastchanged: 'Last changed',
          get: 'You will get',
          solved: 'Solved by (latest 10)',
          and: 'and',
          experience: 'experience',
          submit: 'submit',
          err: 'It seems to be some connection problems',
          inc: 'Incorrect flag!',
          flag: 'Flag',
          required: 'Flag is required',
          invalid: 'Entered flag is not valid SafetyCTF flag'
        }
      },
      ru: {
        message: {
          madeby: 'Создал(а)',
          lastchanged: 'Последнее изменение',
          get: 'Вы получите',
          solved: 'Решили (последние 10)',
          and: 'и',
          experience: 'очков опыта',
          submit: 'отправить',
          err: 'Похоже, произошла ошибка соединения',
          inc: 'Неправильный флаг!',
          flag: 'Флаг',
          required: 'Введите флаг',
          invalid: 'Введенный флаг не является флагом SafetyCTF'
        }
      }
    }
  },
  validations: {
    flag: { required, ctfFlag: value => value.search('ctf') !== -1 }
  },
  data () {
    return {
      flag: '',
      inc: false,
      err: false,
      solved: false,
      auth
    }
  },
  props: [ 'task' ],
  async created () {
    if (this.auth.$auth) {
      try {
        let result = await this.$http.post('tasks/' + this.task.id + '/isSolved', { token: this.$getToken() })

        if (result.data.code === 200 && result.data.solved) this.solved = true
      } catch (err) {
        console.error(err)
        this.err = true
      }
    }
  },
  computed: {
    flagErrors () {
      const errors = []
      if (!this.$v.flag.$dirty) return errors
      !this.$v.flag.required && errors.push(this.$t('message.required'))
      !this.$v.flag.ctfFlag && errors.push(this.$t('message.invalid'))
      return errors
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()

      if (this.flagErrors.length !== 0) return

      try {
        let result = await this.$http.post('tasks/' + this.task.id + '/solved', { token: this.$getToken(), flag: this.flag })

        console.log(result)
        if (result.data.code === 200) {
          this.$v.$reset()
          this.flag = ''
          this.solved = true

          this.err = false
          this.inc = false
          swal('Congratulations!', `You solved ${this.task.name}`, 'success')
        } else {
          switch (result.data.code) {
            case 404: {
              console.error(result.data)
              this.err = true
              this.inc = false
              break
            }
            case 418: {
              this.inc = true
              this.err = false
              swal('Oops!', 'Your flag is incorrect', 'error')
              break
            }
            default: {
              console.error(result.data)
              this.err = true
              this.inc = false
              swal('Oops!', 'An error occured.', 'error')
              break
            }
          }
        }
      } catch (err) {
        console.error(err)
        this.err = true
        this.inc = false
        swal('Oops!', 'Server error.', 'error')
      }
    }
  }
}
</script>
