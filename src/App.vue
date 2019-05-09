<template>
<div id="app">
  <span v-if='this.$route.path === "/"' @click="settings()" id="menu">☰</span>
  <span v-if='this.$route.path === "/settings" && isStored()' @click="cancel()" id="menu">✕</span>
  <img class='logo' src='./assets/img/logo.png'>
  <span v-if='connected === true' id="status" class="green">•</span>
  <span v-else id="status" class="red">•</span>
  <div id="content">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</div>
</template>

<script>
import translations from './assets/lang.json'
import router from './router'
import swal from 'sweetalert'
let bitcoin = require('bitcoinjs-lib')

export default {
  name: 'App',

  data () {
    return {
      connected: null,
      language: ''
    }
  },

  sockets: {
    // on socket connection
    connect: function () {
      console.log('connected to insight')
      this.connected = true
    },
    // on socket disconnect
    disconnect: function () {
      console.log('disconnected from insight')
      router.push('/connection')
      this.connected = false
    }
  },

  methods: {
    // check if settings are stored
    isStored: function () {
      return localStorage.getItem('account') && localStorage.getItem('password')
    },
    // check password and take us to settings page
    settings: async function () {
      // for backwards compatibility (for now), we only ask for password if password exists
      if (localStorage.getItem('password') !== null) {
        let pw = await swal({
          title: this.language.errors.enter,
          buttons: [true, 'Ok'],
          content: {
            element: 'input',
            attributes: {
              type: 'password'
            }
          }
        })
        pw = bitcoin.crypto.sha256(pw).join('')
        // if password matches, show settings
        if (pw === localStorage.getItem('password')) {
          router.push('/settings')
          return
        }
        // if password doesn't match and one was typed, it's wrong - show user
        if (pw !== null) {
          swal('Error!', this.language.errors.wrong, 'error')
        }
      } else {
        router.push('/settings')
      }
    },

    cancel: function () {
      router.replace('/')
    },

    play: function () {
      // ka-fucking-ching!
      let audio = new Audio(require('./assets/kaching.mp3'))
      let audioPromise = audio.play()

      if (audioPromise !== undefined) {
        audioPromise.then(_ => {
          // autoplay started!
        }).catch(error => {
          // autoplay was prevented
          console.log(error)
        })
      }
    }

  },
  // when component is created
  created () {
    // try to detect and set language automatically
    const lang = navigator.language.split('-')[0]
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', lang)
      this.$root.$data.settings.language = lang
    }
  },

  mounted () {
    this.language = translations[this.$root.$data.settings.language]

    // double check that we are connected
    if (this.connected === false) {
      router.push('/connection')
    }
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Barlow:300');

#content {
  margin: 0 auto;
  text-align: center;
}

#menu {
  color: #b2b2b2;
  font-size: 200%;
  position: absolute;
  top: 10px;
  left: 20px;
}

#status {
  font-size: 300%;
  position: absolute;
  top: -3px;
  right: 20px;
}

.red {
  color: var(--red);
}

.green {
  color: var(--green);
}

/* @font-face {
  font-family: Barlow;
  src: url('./assets/fonts/barlow.ttf');
} */

@media (min-width: 500px) {
  #app {
    width: 50vh;
    margin: auto;
  }
}

:root {
  --primary: #0087E8;
  --secondary: #6B6570;
  --background: #ededed;
  --dark: #282727;
  --light: #fff;
  --red: #f10032;
  --green: #47cf73;
}

* {
  font-family: 'Barlow Semi Condensed',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  font-weight: 300;
  outline: none;
}

body {
  background: var(--background);
  padding: 0;
  width: 100%;
  margin: 0 auto;
}

img {
  display: block;
  margin: 0 auto;
  width: 69.5%;
  height: auto;
}

.fade-enter-active {
  transition: all .3s ease;
}

.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(10px);
}
</style>
