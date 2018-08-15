<template>
  <form autocomplete='off'>
    <div v-if="!isAddressStored()">
      <p>{{ language.address }}</p>
      <input v-model='address' type='text' class='input settings' value=''>
    </div>
    <p>{{ language.language }}</p>
    <select v-model="languages">
        <option value="de">Deutsch</option>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
    </select>
    <p>{{ language.currency }}</p>
    <select v-model="currency">
        <option value="AED">AED - United Arab Emirates Dirham</option>
        <option value="AFN">AFN - Afghan Afghani</option>
        <option value="ARS">ARS - Argentine Peso</option>
        <option value="AUD">AUD - Australian Dollar</option>
        <option value="BBD">BBD - Barbadian Dollar</option>
        <option value="BDT">BDT - Bangladeshi Taka</option>
        <option value="BGN">BGN - Bulgarian Lev</option>
        <option value="BHD">BHD - Bahraini Dinar</option>
        <option value="BMD">BMD - Bermudan Dollar</option>
        <option value="BND">BND - Brunei Dollar</option>
        <option value="BOB">BOB - Bolivian Boliviano</option>
        <option value="BRL">BRL - Brazilian Real</option>
        <option value="BTN">BTN - Bhutanese Ngultrum</option>
        <option value="BYN">BYN - Belarusian Ruble</option>
        <option value="BZD">BZD - Belize Dollar</option>
        <option value="CAD">CAD - Canadian Dollar</option>
        <option value="CHF">CHF - Swiss Franc</option>
        <option value="CLP">CLP - Chilean Peso</option>
        <option value="CNY">CNY - Chinese Yuan</option>
        <option value="COP">COP - Colombian Peso</option>
        <option value="CRC">CRC - Costa Rican Colon</option>
        <option value="CZK">CZK - Czech Republic Koruna</option>
        <option value="DKK">DKK - Danish Krone</option>
        <option value="DOP">DOP - Dominican Peso</option>
        <option value="EGP">EGP - Eqyptian Pound</option>
        <option value="ETB">ETB - Ethiopian Birr</option>
        <option value="EUR">EUR - Euro</option>
        <option value="GBP">GBP - British Pound</option>
        <option value="GEL">GEL - Georgian Lari</option>
        <option value="GHS">GHS - Ghanaian Cedi</option>
        <option value="GMD">GMD - Gambian Dalasi</option>
        <option value="GYD">GYD - Guyanaese Dollar</option>
        <option value="HKD">HKD - Hong Kong Dollar</option>
        <option value="HRK">HRK - Croatian Kuna</option>
        <option value="HUF">HUF - Hungarian Forint</option>
        <option value="IDR">IDR - Indonesian Rupiah</option>
        <option value="ILS">ILS - Israeli New Shekel</option>
        <option value="INR">INR - Indian Rupee</option>
        <option value="ISK">ISK - Icelandic Krona</option>
        <option value="JMD">JMD - Jamaican Dollar</option>
        <option value="JPY">JPY - Japanese Yen</option>
        <option value="KES">KES - Kenyan Shilling</option>
        <option value="KRW">KRW - South Korean Won</option>
        <option value="KWD">KWD - Kuwaiti Dinar</option>
        <option value="KYD">KYD - Cayman Islands Dollar</option>
        <option value="KZT">KZT - Kazakhstani Tenge</option>
        <option value="LAK">LAK - Laotian Kip</option>
        <option value="LKR">LKR - Sri Lankan Rupee</option>
        <option value="LRD">LRD - Liberian Dollar</option>
        <option value="LTL">LTL - Lithuanian Litas</option>
        <option value="MAD">MAD - Moroccan Dirham</option>
        <option value="MDL">MDL - Moldovan Leu</option>
        <option value="MKD">MKD - Macedonian Denar</option>
        <option value="MNT">MNT - Mongolian Tugrik</option>
        <option value="MUR">MUR - Mauritian Rupee</option>
        <option value="MWK">MWK - Malawian Kwacha</option>
        <option value="MXN">MXN - Mexican Peso</option>
        <option value="MYR">MYR - Malaysian Ringgit</option>
        <option value="MZN">MZN - Mozambican Metical</option>
        <option value="NAD">NAD - Namibian Dollar</option>
        <option value="NGN">NGN - Nigerian Naira</option>
        <option value="NIO">NIO - Nicaraguan Cordoba</option>
        <option value="NOK">NOK - Norwegian Krone</option>
        <option value="NPR">NPR - Nepalese Rupee</option>
        <option value="NZD">NZD - New Zealand Dollar</option>
        <option value="OMR">OMR - Omani Rial</option>
        <option value="PEN">PEN - Peruvian Sol</option>
        <option value="PGK">PGK - Papua New Guinean Kina</option>
        <option value="PHP">PHP - Philippine Peso</option>
        <option value="PKR">PKR - Pakistani Rupee</option>
        <option value="PLN">PLN - Polish Zloty</option>
        <option value="PYG">PYG - Paraguayan Guarani</option>
        <option value="QAR">QAR - Qatari Rial</option>
        <option value="RON">RON - Romanian Leu</option>
        <option value="RSD">RSD - Serbian Dinar</option>
        <option value="RUB">RUB - Russian Ruble</option>
        <option value="SAR">SAR - Saudi Riyal</option>
        <option value="SEK">SEK - Swedish Krona</option>
        <option value="SGD">SGD - Singapore Dollar</option>
        <option value="SOS">SOS - Somali Shilling</option>
        <option value="SRD">SRD - Surinamese Dollar</option>
        <option value="SSP">SSP - South Sudanese Pound</option>
        <option value="THB">THB - Thai Baht</option>
        <option value="TRY">TRY - Turkish Lira</option>
        <option value="TTD">TTD - Trinidad & Tobago Dollar</option>
        <option value="TWD">TWD - New Taiwan Dollar</option>
        <option value="TZS">TZS - Tanzanian Shilling</option>
        <option value="UAH">UAH - Ukranian Hryvnia</option>
        <option value="UGX">UGX - Ugandan Shilling</option>
        <option value="USD">USD - United States Dollar</option>
        <option value="UYU">UYU - Uruguayan Peso</option>
        <option value="VEF">VEF - Venezuelan Bolivar</option>
        <option value="VND">VND - Vietnamese Dong</option>
        <option value="YER">YER - Yemeni Rial</option>
        <option value="ZAR">ZAR - South African Rand</option>
    </select>
    <p>{{ language.format }}</p>
    <select v-model="format">
        <option value="dash">DASH</option>
        <option value="mdash">mDash</option>
    </select>
    <button @click.prevent="save" class="regular">{{ language.save }}</button>
  </form>
</template>

<script>
import { validate } from 'wallet-address-validator'
import swal from 'sweetalert'
import router from '../router'
import translations from './../assets/lang.json'

export default {
  name: 'Settings',

  data () {
    return {
      language: ''
    }
  },

  computed: {
    address: {
      get () {
        return this.$root.$data.settings.account
      },
      set (value) {
        this.$root.$data.settings.account = value
      }
    },

    languages: {
      get () {
        return this.$root.$data.settings.language
      },
      set (value) {
        this.$root.$data.settings.language = value
      }
    },

    currency: {
      get () {
        return this.$root.$data.settings.currency
      },
      set (value) {
        this.$root.$data.settings.currency = value
      }
    },

    format: {
      get () {
        return this.$root.$data.settings.format
      },
      set (value) {
        this.$root.$data.settings.format = value
      }
    }

  },
  methods: {
    // check if address is stored
    isAddressStored: function () {
      return localStorage.getItem('account')
    },
    // saves input value to local storage and return home
    save: function () {
      const acct = this.$root.$data.settings.account
      // if address starts with 'dash:' we remove it
      if (acct.startsWith('dash:')) {
        this.$root.$data.settings.account = acct.split(':')[1]
        return
      }
      // validating the address form input
      if (acct.startsWith('y')) {
        if (!validate(acct, 'dash', 'testnet')) {
          swal('Error!', 'Please enter a valid Dash address.', 'error')
          console.log('not valid')
          return
        }
      } else {
        if (!validate(acct, 'dash')) {
          swal('Error!', 'Please enter a valid Dash address.', 'error')
          console.log('not valid')
          return
        }
      }
      console.log('saved')
      // save settings to localStorage
      localStorage.setItem('account', this.$root.$data.settings.account)
      localStorage.setItem('language', this.$root.$data.settings.language)
      localStorage.setItem('currency', this.$root.$data.settings.currency)
      localStorage.setItem('format', this.$root.$data.settings.format)
      // go home
      router.replace('/')
    }
  },

  mounted () {
    this.language = translations[this.$root.$data.settings.language]
  }
}
</script>

<style scoped>
  p {
    float: left;
    margin-left: 10%;
    margin-bottom: 0vw;
    color: var(--dark);
  }
  /* remove outlines from form */
  form input:focus,
  form button:focus {
    outline: none;
  }
  /* address input */
  input[type="text"] {
    margin: 2%;
    background: var(--background);
    width: 80%;
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    font-size: 1.5em;
    padding: 10px;
  }
  /* dropdown boxes */
  select {
    width: 85%;
    font-size: 1.5em;
    background: var(--light);
    margin: 10px;
    border-radius: 5px;
  }
  /* save button */
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
