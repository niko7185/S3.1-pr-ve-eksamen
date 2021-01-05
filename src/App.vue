<template>
  <header>
    <TheNav/>
  </header>

  <router-view></router-view>
</template>

<script>
import TheNav from './components/TheNav.vue'

export default {
  components: {
    TheNav,
  },
  data() {
    return {
      user: {
        loggedIn: false,

      }
    };
  },
}
</script>

<style>
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  background-color: #ecfdf5;
  margin: 0px;
}

header {
  background-color: darkgreen;
}

</style>
