<template>
  <div>
    <transition name="fade">
      <div id="loader" :class="loaderClasses" v-show="loading">
        <img id="icon" src="../assets/img/pageLoader.gif">
      </div>
    </transition>
    <div>
      <span>{{ amount }}</span>
      <p id="price">~ {{ unitPrice }}</p>
      <qrcode :value="uri" :options="{ size: 256, backgroundAlpha: 0, foregroundAlpha: 0.8, level: 'H', padding: 15 }" :tag="'img'"></qrcode>
      <p v-show="this.tx.received > 0">received: {{ partial }} {{ this.$root.$data.settings.format }}</p>
      <p v-show="this.tx.received == 0">waiting for payment...</p>
      <progress id="waiting" value="0" max="120"></progress>
      <br>
      <button @click="cancel" class="cancel">cancel</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as spark from './../assets/js/helpers'
import VueQrcode from '@xkeshi/vue-qrcode'
import router from '../router'

Vue.component(VueQrcode.name, VueQrcode)

export default {
  name: 'Qr',

  data () {
    return {
      loading: true,
      loaderClasses: '',
      amount: '',
      uri: '',
      price: {
        mdash: '0',
        dash: '0'
      },
      tx: {
        received: 0,
        locked: false
      }
    }
  },

  methods: {
    cancel: function () {
      // return home
      router.go(-1)
      // unsubscribe from tx events
      this.$socket.emit('unsubscribe', 'inv')
      console.log('not listening')
    }
  },

  sockets: {
    // listen for 'tx' event from insight
    tx: function (data) {
      console.log(data)
      let vm = this
      // check each address in vout
      data.vout.forEach(function (output) {
        let address = Object.keys(output)
        let amount = Object.values(output)
        // if address matches the address we have in settings
        if (address[0] === vm.$root.$data.settings.account) {
          // set amount received and instantsend status
          vm.tx.received = amount[0] / 100000000
          vm.tx.locked = data.txlock
          console.log(`incoming: ${vm.tx.received} to ${address[0]}`)
          console.log(`instantsend: ${vm.tx.locked}`)
          // if the amount is what we're looking for (or more), show confirmed screen
          if (vm.tx.received >= parseFloat(vm.price.dash)) {
            router.replace('/sale/confirmed')
          }
        }
      })
    }
  },

  computed: {
    // returns price in dash or mdash based on settings
    unitPrice: function () {
      return this.$root.$data.settings.format === 'mdash' ? this.price.mdash : this.price.dash
    },
    // shows merchant amount received (usually only seen for partial payments)
    partial: function () {
      return this.$root.$data.settings.format === 'dash' ? parseFloat(this.tx.received).toFixed(8) : (this.tx.received * 1000000).toFixed(2)
    }
  },

  async created () {
    // set the amount
    this.amount = `${this.$route.params.amount} ${this.$root.$data.settings.currency}`
    // get current price
    this.price.dash = `${(parseFloat(this.amount) / parseFloat(await spark.getExchangeRate('DASH', this.$root.$data.settings.currency))).toFixed(8)} DASH`
    // set pice in mdash
    this.price.mdash = `${(parseFloat(this.price.dash) * 1000).toFixed(5)} mDash`
    // set uri for qr code
    this.uri = `dash:${this.$root.$data.settings.account}?amount=${parseFloat(this.price.dash)}&is=1`
    // loading is done
    this.loading = false
    this.loaderClasses = 'fade-out'
  }
}
</script>

<style scoped>
  /* loader background */
  #loader {
    background-color: var(--background);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    transition: .6s;
  }
  /* loader fade out animation */
  .fade-out {
    opacity: 0;
  }
  /* loader gif icon */
  #icon {
    display: block;
    width: 70px;
    margin-left: 20vh;
    margin-top: 30vh;
  }

  img {
    display: block;
    margin: 0 auto;
    width: 79.8%;
    height: auto;
  }

  span {
    margin: 1% auto;
    width: 92%;
    text-align: center;
    color: var(--secondary);
    font-size: 50px;
  }

  p {
    margin: 1% auto;
    width: 92%;
    text-align: center;
    color: var(--secondary);
    font-size: 30px;
  }

  #price {
    margin: 0% auto;
    width: 92%;
    text-align: center;
    font-style: italic;
    color: var(--secondary);
    font-size: 17px;
  }
  /* expiration timer */
  progress[value] {
    /* reset the default appearance */
    -webkit-appearance: none;
    appearance: none;
    width: 80%;
    height: 7px;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  }

  progress[value]::-webkit-progress-value {
    background-color: var(--primary);
    border-radius: 10px;
  }

  /* cancel button */
  button {
    font-size: 180%;
    color: #fff;
    margin: 3vh;
    border-radius: 10px;
    width: 80%;
    height: 10vh;
    border: 1px solid var(--red);
    background: var(--red);
  }

  button:active {
    transform: scale(0.9);
  }
</style>
