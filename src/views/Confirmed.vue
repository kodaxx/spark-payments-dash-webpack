<template>
  <div>
    <br>
    <p>Payment Received!&nbsp;
      <img v-if="locked === '1'" id="lock" src="../assets/img/locked.png">
      <img v-else id="lock" src="../assets/img/unlocked.png">
    </p>
    <br>
    <img src='../assets/img/confirm.png'>
    <br>
    <p>Thank you!</p>
    <br>
    <button @click="done">done</button>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Confirmed',

  data () {
    return {
      locked: '0'
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
  },

  mounted () {
    // ka-fucking-ching!
    let audio = new Audio(require('../assets/kaching.mp3'))
    audio.play()
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
