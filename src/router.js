import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";

import Hello from "./components/Hello";
import NotFound from "./components/NotFound";
import Game from "./components/Game";
import MyAccount from "./components/Game/MyAccount";
import Tasks from "./components/Game/Tasks";
import UserView from "./components/Game/UserView";
import Invited from "./components/Game/Invited";
import Leaderboard from "./components/Game/Leaderboard";

Vue.use(Router);

let router = new Router({
  mode: "history",
  fallback: true,
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/Game",
      name: "Game",
      component: Game,
      children: [
        {
          path: "MyAccount",
          component: MyAccount
        },
        {
          path: "Tasks",
          component: Tasks
        },
        {
          path: "User/:username",
          component: UserView
        },
        {
          path: "invited/:invitedBy",
          component: Invited
        },
        {
          path: "admin",
          component: () =>
            import(/* webpackChunkName: "admin" */ "./components/Game/AdminPanel")
        },
        {
          path: "leaderboard",
          component: Leaderboard
        }
      ]
    },
    {
      path: "/",
      name: "Hello",
      component: Hello
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
