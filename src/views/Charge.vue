<template>
  <form autocomplete='off'>
    <!-- amount display -->
    <input v-model='price' type='text' class='input pad' value='' disabled>
    <br>
    <!-- number pad buttons -->
    <input @click="add('1')" type='button' class='number' value='1'>
    <input @click="add('2')" type='button' class='number' value='2'>
    <input @click="add('3')" type='button' class='number' value='3'>
    <br>
    <input @click="add('4')" type='button' class='number' value='4'>
    <input @click="add('5')" type='button' class='number' value='5'>
    <input @click="add('6')" type='button' class='number' value='6'>
    <br>
    <input @click="add('7')" type='button' class='number' value='7'>
    <input @click="add('8')" type='button' class='number' value='8'>
    <input @click="add('9')" type='button' class='number' value='9'>
    <br>
    <input @click="add('0')" type='button' class='number' value='0'>
    <input @click="add('00')" type='button' class='number' value='00'>
    <input @click="remove()" type='button' class='delete' value='⌫'>
    <br>
    <!-- charge button -->
    <button @click.prevent="purchase" class="charge">charge</button>
  </form>
</template>

<script>
import swal from 'sweetalert'
import router from '../router'

export default {
  name: 'Charge',
  data () {
    return {
      native: ''
    }
  },

  computed: {
    price: function () {
      if (this.$root.$data.settings.currency.match(/BYN|CLP|ISK|JPY|KRW|PYG|UGX|UYU|VND/g) !== null) {
        // these currencies have no decimals
        return this.native || 0
      } else if (this.$root.$data.settings.currency.match(/BHD|KWD|OMR/g) !== null) {
        // these currencies have 3 decimals
        return parseFloat(this.native / 100).toFixed(3) || 0
      } else {
        // these currencies have 2 decimals
        return parseFloat(this.native / 100).toFixed(2) || 0
      }
    }
  },

  methods: {
    // adds pressed key to amount display
    add: function (num) {
      this.native = this.native + num
    },
    // removes pressed key from amount display
    remove: function () {
      this.native = this.native.slice(0, -1)
    },
    // begins purchase
    purchase: function () {
      // subscribe to tx events
      this.$socket.emit('subscribe', 'inv')
      console.log('listening')
      // if amount is empty, notify merchant and stop function
      if (this.native === '' || this.native === 0) { // string vs int?
        swal('Error!', 'Price cannot be blank. Please enter an amount.', 'error')
        return
      }
      // show QR page and pass data
      router.push(`/sale/${this.price}`)
    }
  }
}
</script>

<style scoped>
  /* remove outlines from form */
  form input:focus,
  form button:focus {
    outline: none;
  }
  /* amount display */
  input[type="text"] {
    margin: 2%;
    background: var(--background);
    width: 80%;
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    font-size: 3em;
    text-align: center;
  }
  /* number pad buttons */
  input[type="button"] {
    background: var(--background);
    color: var(--secondary);
    border: none;
    border-radius: 50%;
    text-align: center;
    width: 22%;
    -webkit-appearance: none;
    margin: 1%;
    padding: 11% 0;
    font-size: 230%;
    line-height: 0;
    box-shadow: var(--primary) 0 0 1px 1px;
  }

  input[type="button"]:active {
    background: var(--primary);
    color: #fff;
  }
  /* delete button */
  input[type="button"].delete {
    box-shadow: var(--red) 0 0 1px 1px;
  }

  input[type="button"].delete:active {
    background: var(--red);
    color: #fff;
  }
  /* charge button */
  button {
    font-size: 180%;
    color: #fff;
    margin: 3vh;
    border-radius: 10px;
    width: 80%;
    height: 10vh;
    border: 1px solid var(--green);
    background: var(--green);
  }

  button:active {
    transform: scale(0.9);
  }
</style>
