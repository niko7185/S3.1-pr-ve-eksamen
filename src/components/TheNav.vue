
<template>
    <nav>
      <router-link to="/about">Log In</router-link>
      <router-link to="/about">Register</router-link>
    </nav>
</template>

<style scoped>
    nav {
        max-width: 100%;
        margin: auto;
        padding: 2px 0;
        text-align: center;
    }

    a {
        color: white;
        padding: 0.5rem 1rem;
        text-decoration: none;
        display: inline-block;
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
