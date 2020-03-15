import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/pages/home-page/home-page.vue')
    },
    {
      name: 'test',
      path: '/test',
      component: () => import('@/pages/test/test.vue')
    }
  ]
})
