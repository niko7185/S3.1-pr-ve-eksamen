
<template>
    <nav v-if="!user">
      <router-link to="/home">Home</router-link>
      <router-link to="/login">Log In</router-link>
      <router-link to="/register">Register</router-link>
    </nav>
    <nav v-else>
      <span>{{ user.name }}</span>
      <router-link to="/home">Home</router-link>
      <router-link to="/activities/add">Aktiviteter</router-link>
      <a @click="logOut">Log Out</a>
    </nav>
</template>

<script>
export default {
    props: ["user"],
    inject: ["logInUser"],
    methods: {
        logOut() {
            this.logInUser(null);
            localStorage.removeItem("user");
            this.$router.push("/home?update=true");
        }
    }
}
</script>

<style scoped>
    nav {
        max-width: 100%;
        margin: auto;
        padding: 2px 0;
        text-align: center;
    }

    span {
        color: white;
        font-weight: bold;
        margin-right: 1em;
    }

    a {
        color: white;
        padding: 0.5rem 1rem;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
    }

    a:hover {
        background-color:#e7e7e7;
        color: darkgreen;
    }
    
    @media screen and (min-width: 250px) {
        nav {
            text-align: left;
            max-width: 70%;
        }
    }

</style>
