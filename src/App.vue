<template>
  <header>
    <TheNav :user="user"/>
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
      localStorage.setItem("user", JSON.stringify(user));
      this.user = user;
    }
  },
  provide() {
    return {
      logInUser: this.logInUser,
    };
  },
  created() {
    this.user = localStorage.getItem('user');
    
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
  margin-bottom: 1rem;
}

main {
  max-width: 60%;
  margin: auto;
}

</style>
