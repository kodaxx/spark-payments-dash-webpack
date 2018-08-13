<template>
  <div>
    <br>
    <p>Payment Received!&nbsp;<img v-show="locked === false" :class="lockClass" src="../assets/img/unlocked.png"></p>
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
      locked: false,
      lockClass: 'lock'
    }
  },

  methods: {
    done: function () {
      router.replace('/')
    }
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
  .lock {
    width: 5.5vw;
    display: inline;
  }

  .unlocked {
    fill: var(--red);
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
