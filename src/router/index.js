import Vue from 'vue'
import VueRouter from 'vue-router'
import Homelayout from '@/layouts/Frontend'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: Homelayout }
  },
  {
    path: '/about',
    name: 'About',   
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "*",
    name: "Error",
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
