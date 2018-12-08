<template>
  <div>
    <v-alert
      type="error"
      icon="signal_cellular_connected_no_internet_4_bar"
      :value="err"
      transition="scale-transition"
    >
      {{ $t("message.err") }}
    </v-alert>

    <form>
      <v-layout row>
        <v-text-field
          label="E-mail"
          v-model="email"
          :error-messages="emailErrors"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          required
          prepend-icon="email"
        ></v-text-field>
      </v-layout>

      <v-layout row>
        <v-text-field
          :label="$t('message.name')"
          v-model="name"
          :error-messages="nameErrors"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          required
          prepend-icon="account_circle"
        ></v-text-field>
      </v-layout>

      <v-layout row>
        <v-text-field
          :label="$t('message.surname')"
          v-model="surname"
          :error-messages="surnameErrors"
          @input="$v.surname.$touch()"
          @blur="$v.surname.$touch()"
          required
          prepend-icon="account_circle"
        ></v-text-field>
      </v-layout>

      <v-layout row>
        <v-text-field
          :label="$t('message.password')"
          v-model="password"
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          required
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          @click:append="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          prepend-icon="lock"
        ></v-text-field>
      </v-layout>

      <v-layout row>
        <v-text-field
          :label="$t('message.cPassword')"
          v-model="cPassword"
          :error-messages="cPasswordErrors"
          @input="$v.cPassword.$touch()"
          @blur="$v.cPassword.$touch()"
          required
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          @click:append="() => (e2 = !e2)"
          :type="e2 ? 'password' : 'text'"
          prepend-icon="lock"
        ></v-text-field>
      </v-layout>

      <v-date-picker v-model="dob"></v-date-picker>

      <v-layout row style="margin-top: 10px;">
        <v-btn @click="submit">{{ $t("message.register") }}</v-btn>
        <v-btn @click="clear">{{ $t("message.clear") }}</v-btn>
      </v-layout>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    surname: { required },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    cPassword: { required, sameAsPassword: sameAs("password") }
  },
  props: ["invitedBy"],
  i18n: {
    messages: {
      en: {
        message: {
          err: "It seems to be some connection problems",
          name: "Name",
          surname: "Surname",
          password: "Password",
          cPassword: "Confirm password",
          register: "Register",
          clear: "Clear",
          invalidEmail: "Must be valid e-mail",
          noEmail: "E-mail is required",
          noPassword: "Password is required",
          shortPassword: "Pasword is too short",
          noCPassword: "Password confirmation is required",
          doesntMatch: "Passwords does not match",
          nameReq: "Name is required",
          surnameReq: "Surname is required"
        }
      },
      ru: {
        message: {
          err: "Похоже, произошла ошибка соединения",
          name: "Имя",
          surname: "Фамилия",
          password: "Пароль",
          cPassword: "Подтвердите пароль",
          register: "Зарегистрироваться",
          clear: "Очистить",
          invalidEmail: "Введите корректный e-mail",
          noEmail: "Введите e-mail",
          noPassword: "Введите пароль",
          shortPassword: "Пароль слишком короткий",
          noCPassword: "Необходимо подтверждение пароля",
          doesntMatch: "Пароли не совпадают",
          nameReq: "Введите имя",
          surnameReq: "Введите фамилию"
        }
      }
    }
  },
  data: () => ({
    email: "",
    password: "",
    cPassword: "",
    name: "",
    surname: "",
    e1: true,
    e2: true,
    err: false,
    dob: ""
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.$t("message.invalidEmail"));
      !this.$v.email.required && errors.push(this.$t("message.noEmail"));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t("message.noPassword"));
      !this.$v.password.minLength &&
        errors.push(this.$t("message.shortPassword"));
      return errors;
    },
    cPasswordErrors() {
      const errors = [];
      if (!this.$v.cPassword.$dirty) return errors;
      !this.$v.cPassword.required &&
        errors.push(this.$t("message.noCPassword"));
      !this.$v.cPassword.sameAsPassword &&
        errors.push(this.$t("message.doesntMatch"));
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push(this.$t("message.nameReq"));
      return errors;
    },
    surnameErrors() {
      const errors = [];
      if (!this.$v.surname.$dirty) return errors;
      !this.$v.surname.required && errors.push(this.$t("message.surnameReq"));
      return errors;
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();

      if (
        this.passwordErrors.length ||
        this.cPasswordErrors.length ||
        this.emailErrors.length ||
        this.nameErrors.length ||
        this.surnameErrors.length ||
        !this.dob
      )
        return;

      try {
        let result;
        if (this.invitedBy) {
          result = await this.$http.post("/auth/register", {
            username: this.email,
            password: this.password,
            name: this.name,
            surname: this.surname,
            dob: this.dob,
            invitedBy: this.invitedBy
          });
        } else {
          result = await this.$http.post("/auth/register", {
            username: this.email,
            password: this.password,
            name: this.name,
            surname: this.surname,
            dob: this.dob
          });
        }

        if (result.data.code === 200) {
          this.$v.$reset();
          this.email = "";
          this.password = "";
          this.cPassword = "";
          this.name = "";
          this.surname = "";

          this.err = false;
          this.$swal(
            "Hi!",
            "Welcome to the SafetyCTF. You are registered now!",
            "success"
          );
        } else {
          console.error(result.data);
          this.err = true;
          this.$swal(
            "Oops!",
            "There is some error! Regisration failed.",
            "error"
          );
        }
      } catch (e) {
        console.error(e);
        this.err = true;
        this.$swal("Oops!", "Server error! Regisration failed.", "error");
      }
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
      this.cPassword = "";
      this.name = "";
      this.surname = "";
    }
  }
};
</script>
