<template>
  <div>
    <br>
    <p>{{ language.payment_received }}&nbsp;
      <img v-if="locked === '1'" id="lock" src="../assets/img/locked.png">
      <img v-else id="lock" src="../assets/img/unlocked.png">
    </p>
    <br>
    <img src='../assets/img/confirm.png'>
    <br>
    <p>{{ language.thanks }}</p>
    <br>
    <button v-if="!this.$route.query.platform === 'web'" @click="done">{{ language.done }}</button>
  </div>
</template>

<script>
import router from '../router'
import translations from './../assets/lang.json'

export default {
  name: 'Confirmed',

  data () {
    return {
      locked: '0',
      language: ''
    }
  },

  methods: {
    done: function () {
      // navigate home
      router.replace('/')
    }
  },

  created () {
    // set the status
    this.locked = this.$route.params.status
    // stop listening for tx events
    this.$socket.emit('unsubscribe', 'inv')
    console.log('not listening')
    // update xpub index on successful tx
    let index = localStorage.getItem('index')
    index = parseFloat(index) + 1
    localStorage.setItem('index', index)
  },

  mounted () {
    this.$parent.play()
    // set language
    this.language = translations[this.$root.$data.settings.language]
  }

}
</script>

<style scoped>
  p {
    color: var(--dark);
    margin: 1% auto;
    width: 92%;
    text-align: center;
    font-size: 30px;
  }
  #lock {
    width: 23px;
    display: inline;
  }
  /* charge button */
  button {
    font-size: 180%;
    color: #fff;
    margin: 3vh;
    border-radius: 10px;
    width: 80%;
    height: 10vh;
    border: 1px solid var(--primary);
    background: var(--primary);
  }

  button:active {
    transform: scale(0.9);
  }
</style>
