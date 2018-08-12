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
      <p v-show="price.received > 0">received: {{ partial }} {{ this.$root.$data.settings.format }}</p>
      <p v-show="price.received == 0">waiting for payment...</p>
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
        received: '0',
        mdash: '0',
        dash: '0'
      }
    }
  },

  methods: {
    cancel: function () {
      // return home
      router.go(-1)
    }
  },

  computed: {
    unitPrice: function () {
      return this.$root.$data.settings.format === 'mdash' ? this.price.mdash : this.price.dash
    },
    partial: function () {
      return this.$root.$data.settings.format === 'dash' ? parseFloat(this.price.received).toFixed(8) : (this.price.received * 1000000).toFixed(2)
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
    this.loadClasses = 'fade-out'
  },

  mounted: function () {

  }
}
</script>

<style scoped>
#loader {
  background-color: var(--background);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  transition: .6s;
}

.fade-out {
  opacity: 0;
}

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

progress[value] {
  /* Reset the default appearance */
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
