<template>
  <div id="connection">
    <h1 id='red'>not connected</h1>
    <h1 id='dark'>please check internet</h1>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Connection',

  sockets: {
    connect: function () {
      router.push('/')
    }
  }

}
</script>

<style scoped>
  h1 {
    font-size: 40px;
    text-align: center;
  }

  #red {
    color: var(--red);
  }

  #dark {
    color: var(--dark);
  }
</style>
