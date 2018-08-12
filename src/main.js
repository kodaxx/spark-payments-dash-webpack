import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    tx: {
      address: '',
      initial: 0,
      locked: false
    },
    settings: {
      account: localStorage.getItem('account') || '',
      currency: localStorage.getItem('currency') || 'USD',
      format: localStorage.getItem('format') || 'dash'
    }
  },
  created () {
    // if device is offline, show connection page
    if (!navigator.onLine) {
      router.push('/offline')
    }
    // if there's no account saved, show settings page
    if (!localStorage.getItem('account')) {
      router.push('/settings')
    }
  },
  router,
  components: { App },
  template: '<App/>'
})
