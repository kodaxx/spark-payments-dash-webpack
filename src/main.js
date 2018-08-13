import Vue from 'vue'
import App from './App'
import router from './router'
import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

export const url = socketio('https://testnet-insight.dashevo.org:443')

Vue.use(VueSocketIO, url)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    settings: {
      account: localStorage.getItem('account') || '',
      currency: localStorage.getItem('currency') || 'USD',
      format: localStorage.getItem('format') || 'dash'
    }
  },
  created () {
    // if device is offline, show connection page
    window.addEventListener('offline', function () {
      router.push('/connection')
    })
    // if device comes online, show connection page
    window.addEventListener('online', function () {
      router.push('/')
    })
    // if there's no account saved, show settings page
    if (!localStorage.getItem('account')) {
      router.push('/settings')
    }
  },
  router,
  components: { App },
  template: '<App/>'
})
