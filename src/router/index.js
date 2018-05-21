import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NotFound from '@/components/NotFound'
import Game from '@/components/Game'
import MyAccount from '@/components/Game/MyAccount'
import Tasks from '@/components/Game/Tasks'
import UserView from '@/components/Game/UserView'
import Invited from '@/components/Invited'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Game',
      name: 'Game',
      component: Game,
      children: [
        {
          path: 'MyAccount',
          component: MyAccount
        },
        {
          path: 'Tasks',
          component: Tasks
        },
        {
          path: 'User/:username',
          name: 'UserView',
          component: UserView
        },
        {
          path: 'invited/:invitedBy',
          component: Invited
        }
      ]
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
