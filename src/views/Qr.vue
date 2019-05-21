<template>
  <div>
    <half-circle-spinner v-if="!loading" id="spinner" :animation-duration="1000" :size="30" color="var(--primary)" />
    <transition name="fade">
      <div id="loader" :class="loaderClasses" v-show="loading">
        <hollow-dots-spinner id="icon" :animation-duration="1000" :dot-size="15" :dots-num="3" color="var(--primary)" />
      </div>
    </transition>
    <div>
      <span>{{ amount }}</span>
      <p id="price">~ {{ unitPrice }}</p>
      <qrcode v-show="qr" @click.native="test()" :value="uri" :options="{ size: 256, backgroundAlpha: 0, foregroundAlpha: 0.8, level: 'H', padding: 15 }" :tag="'img'"></qrcode>
      <div v-show="!qr" id="cointext" @click="test()">
        <div id="content">
          <img id="cointext-logo" src='../assets/img/cointext.png'>
          <p id="invoice">{{ this.invoice }}</p>
        </div>
      </div>
      <p v-show="this.tx.received > 0">{{ language.partial }}: {{ partial }} {{ this.$root.$data.settings.format }}</p>
      <p v-show="this.tx.received == 0">{{ language.waiting }}</p>
      <br>
      <button v-if="!this.$route.query.address" @click="cancel" class="cancel">{{ language.cancel }}</button>
    </div>
  </div>
</template>

<script>
import * as spark from './../assets/js/helpers'
import axios from 'axios'
import VueQrcode from '@xkeshi/vue-qrcode'
import router from '../router'
import { HalfCircleSpinner, HollowDotsSpinner } from 'epic-spinners'
import translations from './../assets/lang.json'

export default {
  name: 'Qr',

  components: {
    'qrcode': VueQrcode,
    HalfCircleSpinner,
    HollowDotsSpinner
  },

  data () {
    return {
      loading: true,
      qr: true,
      loaderClasses: '',
      amount: '',
      address: '',
      uri: '',
      invoice: '',
      price: {
        mdash: '0',
        dash: '0'
      },
      tx: {
        received: 0,
        locked: false
      },
      language: ''
    }
  },

  methods: {
    test: function () {
      this.qr = !this.qr
    },

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
      // bind 'this' for use inside the function
      let vm = this
      // check each address in vout
      data.vout.forEach(function (output) {
        let address = Object.keys(output)
        let amount = Object.values(output)
        // if address matches the address we have in settings
        if (address[0] === vm.address) {
          // set amount received and instantsend status
          vm.tx.received = vm.tx.received + (amount[0] / 100000000)
          vm.tx.locked = data.txlock
          let status = vm.tx.locked
          let duffs = Math.round(parseFloat(vm.price.dash) * 100000000)
          // we figure out if the cointext screen is showing when we receive funds - for analytics
          let method = vm.qr ? 'qr' : 'cointext'
          console.log(`incoming: ${vm.tx.received} to ${address[0]}`)
          console.log(`instantsend: ${vm.tx.locked}`)
          // if the amount is what we're looking for (or more), show confirmed screen
          if (vm.tx.received >= parseFloat(vm.price.dash)) {
            // customer completes transaction - we send value, IS status, local currency, qr or cointext - for analytics
            if (vm.$route.query.address) {
              router.replace(`/sale/confirmed/${status}?platform=web`)
              window.dataLayer.push({
                event: 'GAEvent',
                eventCategory: 'Web Transaction',
                eventAction: 'Completed',
                eventLabel: `${vm.address},${data.txid},${status},${vm.$root.$data.settings.currency},${method}`,
                eventValue: duffs
              })
            } else {
              router.replace(`/sale/confirmed/${status}`)
              window.dataLayer.push({
                event: 'GAEvent',
                eventCategory: 'POS Transaction',
                eventAction: 'Completed',
                eventLabel: `${vm.address},${data.txid},${status},${vm.$root.$data.settings.currency},${method}`,
                eventValue: duffs
              })
            }
          } else {
            let remaining = parseFloat(vm.price.dash) - vm.tx.received
            vm.uri = `dash:${vm.address}?amount=${remaining}&is=1`
            // TODO: change price, debate over remaining vs received
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
    // listen for transaction
    this.$socket.emit('subscribe', 'inv')
    console.log('listening')
    // set the amount
    this.amount = this.$route.params.amount
    // get current price
    this.price.dash = `${(parseFloat(this.amount) / parseFloat(await spark.getExchangeRate(this.amount.split(' ')[1]))).toFixed(8)} DASH`
    // set pice in mdash
    this.price.mdash = `${(parseFloat(this.price.dash) * 1000).toFixed(5)} mDash`
    // get address
    this.address = this.$route.query.address || await spark.getAddress(this.$root.$data.settings.account)
    // set uri for qr code
    this.uri = `dash:${this.address}?amount=${parseFloat(this.price.dash)}&is=1`
    // set dash amount in duffs
    let duffs = Math.round(parseFloat(this.price.dash) * 100000000)
    // push data to analytics
    // window.dataLayer.push({
    //   event: 'GAEvent',
    //   eventCategory: 'Transaction',
    //   eventAction: 'Initiated',
    //   eventLabel: this.address,
    //   eventValue: duffs
    // })
    // set url for cointext or dashtext
    // let url = `https://api.get-spark.com/invoice?addr=${this.address}&amount=${duffs}`
    let url = `https://api.get-spark.com/dashtext?addr=${this.address}&amount=${duffs}`
    // get invoice number from cointext
    console.log(url)
    let vm = this

    axios.get(url)
      .then(result => {
        vm.invoice = `"BUY ${result.data}"`
        console.log(result.data)
      })
      .catch(error => {
        console.log(`Error: ${error}`)
      })
    // loading is done
    this.loading = false
    this.loaderClasses = 'fade-out'
  },

  mounted () {
    this.language = translations[this.$root.$data.settings.language]
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
  /* loader sipinner */
  #icon {
    margin: 30vh auto;
  }

  @media (min-width: 500px) {
    #icon {
      margin: 30vh 0 0 19.5vh;
    }
  }

  #spinner {
    position: absolute;
    top: 18px;
    left: 20px;
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
    margin: .7% auto;
    width: 92%;
    text-align: center;
    color: var(--secondary);
    font-size: 30px;
  }

  #cointext {
    position: relative;
    width: 79.8%;
    margin: 0 auto;
  }

  #cointext:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  #content {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #cointext-logo {
    margin-top: 30px;
  }

  #invoice {
    margin-top: 50px;
  }

  #price {
    margin: 0% auto;
    width: 92%;
    text-align: center;
    font-style: italic;
    color: var(--secondary);
    font-size: 17px;
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
