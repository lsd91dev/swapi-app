import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

import Planets from '@/views/Planets.vue';
import Planet from '@/views/Planet';

import People from '@/views/People.vue';
import Character from '@/views/Character';

import Starships from '@/views/Starships';
import Starship from '@/views/Starship';

Vue.use(VueRouter)

const routes = [
  {
    path: '/api',
    name: 'home',
    component: Home,
  },
  {
    path: '/api/planets',
    name: 'planets',
    component: Planets
  },
  {
    path: '/api/people',
    name: 'people',
    component: People,
  },
  {
    path: '/api/starships',
    name: 'starships',
    component: Starships
  },

  {
    path: '/api/people/:id',
    name: 'character',
    component: Character
  },
  {
    path: '/api/planet/:id',
    name: 'planet',
    component: Planet
  },
  {
    path: '/api/starship/:id',
    name: 'starship',
    component: Starship
  },
  {
    path: '*',
    redirect: '/api'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
