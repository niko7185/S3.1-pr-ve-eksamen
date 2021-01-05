<template>
  <section v-if="!user">
    <h1>Velkommen til Moodtracker!</h1>
    <p>
      Her kan du logge aktiviteter der enten giver eller tager energi og på denne måde kunne holde et energiregnskab.
      <router-link to="/login">log in</router-link> eller <router-link to="/register">opret en account</router-link>
    </p>
  </section>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  },
  inject: ["user"]
}
</script>

<style scoped>
  h1, p {
    text-align: center;
  }
</style>
