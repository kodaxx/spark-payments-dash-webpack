import Vue from 'vue'
import Router from 'vue-router'
import Charge from '@/views/Charge'
import Qr from '@/views/Qr'
import Confirmed from '@/views/Confirmed'
import Settings from '@/views/Settings'
import Connection from '@/views/Connection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Charge',
      component: Charge
    },
    {
      path: '/sale/confirmed/:status',
      name: 'Confirmed',
      component: Confirmed
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
    },
    {
      path: '/connection',
      name: 'Connection',
      component: Connection
    }
  ]
})
