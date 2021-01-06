<template>
  
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="plusIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </symbol>
  </svg>
  <section v-if="!user">
    <h1>Velkommen til Moodtracker!</h1>
    <p>
      Her kan du logge aktiviteter der enten giver eller tager energi og på denne måde kunne holde
      <br/> et energiregnskab.
      <router-link to="/login">log in</router-link> eller <router-link to="/register">opret en account</router-link>
    </p>
  </section>
  <section v-else>
    <ul v-if="user.activities">
      
    </ul>
    <h2 v-else>Du har endnu ikke oprettet en aktivitet</h2>
    <div class="right">
      
      <round-button>
        <router-link to="/activity">
          
          <svg class="plus">
            <use xlink:href="#plusIcon" />
          </svg>
        </router-link>
      </round-button>
    </div>
  </section>
</template>

<script>
import RoundButton from '../../components/UI/RoundButton.vue';

export default {
  name: 'Home',
  components: {
    RoundButton,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    
  },
  watch: {
    $route(value) {
      if (value.query.update) {
        
        this.user = JSON.parse(localStorage.getItem('user'));
        this.$router.push("/home");
      }
    }
  }
  
}
</script>

<style scoped>
  h1, h2, p {
    text-align: center;
  }

  .plus {
    color: white;
    width: 4rem;
    height: 4rem;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
</style>
