<template>
  <div id="app">
    <span v-if='this.$route.path === "/"' @click="settings()" id="menu">☰</span>
    <span v-if='this.$route.path === "/settings"' @click="cancel()" id="menu">✕</span>
    <img class='logo' src='./assets/img/logo.png'>
      <div id="content">
        <transition name="fade">
          <router-view/>
        </transition>
      </div>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'App',

  sockets: {
    connect: function () {
      console.log('connected to insight')
    },

    disconnect: function () {
      console.log('disconnected from insight')
      router.push('/connection')
    }
  },

  methods: {
    settings: function () {
      router.push('/settings')
    },
    cancel: function () {
      router.go(-1)
    }
  },

  created () {
    if (!this.connected) {
      router.push('/connection')
    }
  }
}
</script>

<style>
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

  @font-face {
    font-family: Barlow;
    src: url('./assets/fonts/barlow.ttf');
  }

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
    font-family: Barlow, 'PT Sans', sans-serif;
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
