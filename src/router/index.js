import Vue from 'vue'
import Router from 'vue-router'
import Charge from '@/views/Charge'
import Qr from '@/views/Qr'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Charge',
      component: Charge
    },
    {
      path: '/sale/:amount',
      name: 'Qr',
      component: Qr
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
