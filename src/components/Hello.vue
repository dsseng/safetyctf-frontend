<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title
        >⚡️<logo
          width="112.5"
          heigth="31.25"
          :isVertical="false"
          style="display: inline-block; vertical-align: middle;"
        ></logo>
        👨‍💻👩‍💻</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <lang-switch></lang-switch>
      </v-toolbar-items>
    </v-toolbar>
    <v-alert
      color="error"
      icon="signal_cellular_connected_no_internet_4_bar"
      :value="connErr"
      transition="scale-transition"
    >
      {{ $t("hello.error") }}
    </v-alert>
    <v-parallax
      src="img/602727-background-city-1920x1200-windows-7.jpg"
      height="600"
    >
      <transition appear appear-to-class="animated bounceInDown">
        <v-layout column align-center justify-center class="yellow--text">
          <h1 class="yellow--text mb-2 display-1 text-xs-center">
            {{ $t("hello.welcome") }}
          </h1>
          <div class="subheading mb-3 text-xs-center">
            {{ $t("hello.descr") }}
          </div>
          <v-btn
            class="blue lighten-2 mt-5 animated infinite tada"
            dark
            large
            to="/game/myaccount"
          >
            {{ $t("hello.getStarted") }}
          </v-btn>
        </v-layout>
      </transition>
    </v-parallax>
    <v-layout row wrap justify-space-around style="margin-top: 15px;">
      <v-flex xs12 md3>
        <transition appear appear-to-class="animated bounceInLeft">
          <v-card>
            <v-card-media
              src="img/148573-best-hacking-wallpaper-1920x1080.jpg"
              height="200px"
            ></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ $t("hello.manyPlayers") }}</h3>
                <div>
                  {{ $tc("hello.users", usersTotal, { count: usersTotal }) }}
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" to="/game/myaccount">{{
                $t("hello.beOne")
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </transition>
      </v-flex>
      <v-flex xs12 md3>
        <transition appear appear-to-class="animated bounceIn">
          <v-card>
            <v-card-media
              src="img/80891-math-background-1920x1200-meizu.jpg"
              height="200px"
            ></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ $t("hello.manyTasks") }}</h3>
                <div>
                  {{ $tc("hello.tasks", tasksTotal, { count: tasksTotal }) }}
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="green" to="/game/myaccount">{{
                $t("hello.solve")
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </transition>
      </v-flex>
      <v-flex xs12 md3>
        <transition appear appear-to-class="animated bounceInRight">
          <v-card>
            <v-card-media
              src="img/677680-new-cool-math-backgrounds-1920x1080-high-resolution.jpg"
              height="200px"
            ></v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ $t("hello.interesting") }}</h3>
                <div>{{ $t("hello.made") }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="red" to="/game/myaccount">{{
                $t("hello.super")
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </transition>
      </v-flex>
    </v-layout>
    <section style="margin-top: 15px;">
      <v-container>
        <p>{{ $t("hello.competition") }}</p>
        <p>{{ $t("hello.if") }}</p>
      </v-container>
    </section>
    <section style="margin-top: 15px;">
      <v-container>
        <h1>{{ $t("hello.leaderboard") }}</h1>
        <leaderboard></leaderboard>
      </v-container>
    </section>
  </v-app>
</template>

<script>
import anime from "animejs";
import swal from "sweetalert2";
import LangSwitch from "./Game/LangSwitch";
import Leaderboard from "./Game/Leaderboard";
import Logo from "./Logo";

export default {
  name: "hello",
  components: { LangSwitch, Logo, Leaderboard },
  data() {
    return {
      tasksTotal: 0,
      usersTotal: 0,
      connErr: false
    };
  },
  async created() {
    try {
      const { data } = await this.$http.get("/stats/usersAndTasks");

      if (data.code === 200) {
        let vm = this;
        anime({
          targets: vm,
          usersTotal: data.usersCount,
          tasksTotal: data.tasksCount,
          duration: 1000,
          easing: "linear",
          round: 1
        });
        this.connErr = false;
      } else {
        console.log(data);
        this.connErr = true;
        swal("Ouch!", "Failed to get statistics!", "error");
      }
    } catch (err) {
      console.log(err);
      this.connErr = true;
      swal("Ouch!", "Failed to get statistics!", "error");
    }
  }
};
</script>
