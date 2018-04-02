import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Game from '@/components/Game'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Game',
      name: 'Game',
      component: Game
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
