<template>
  <header>
    <TheNav/>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
import TheNav from './components/TheNav.vue'

export default {
  components: {
    TheNav,
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    logInUser(user) {
      console.log(user);
      this.user = user;
    }
  },
  provide() {
    return {
      user: this.user,
      logInUser: this.logInUser,
    };
  }
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
  margin-bottom: 1rem;
}

main {
  max-width: 60%;
  margin: auto;
}

</style>
