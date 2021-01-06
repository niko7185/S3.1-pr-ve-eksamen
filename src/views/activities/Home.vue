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
    <ul v-if="user.activities.length">
      <li v-for="(activity, i) in user.activities" :key="i">
        <base-wrapper>
          <div class="devider">
            <h3 class="title">{{ activity.title }}</h3>
            <router-link :to="'/activity?activityId=' + activity.id">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </router-link>
          </div>
          <p class="time">{{ getDateTime(activity.time) }}</p>
          <p class="description">{{ activity.description }}</p>
          <p class="ranking">Ranking: {{ moodRanking[activity.mood] }}</p>
        </base-wrapper>
      </li>
    </ul>
    <h2 v-else>Du har endnu ikke oprettet en aktivitet</h2>
    <div class="right">
      
      <round-button>
        <router-link to="/activity/">
          
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
import BaseWrapper from '../../components/UI/BaseWrapper.vue';

export default {
  name: 'Home',
  components: {
    RoundButton,
    BaseWrapper,
  },
  data() {
    return {
      user: null,
      moodRanking: {
        angry: 1,
        sad: 2,
        ok: 3,
        good: 4,
        happy: 5,
      }, 
    };
  },
  methods: {
    getDateTime(time){
      const seconds = Math.floor((Date.now() - time) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);

      const now = new Date();

      let hour = now.getHours() - hours;
      let min = now.getMinutes() - minutes;

      if (min < 0) {
        hour = (hour === 1) ? 24 : hour - 1;
        min += 60; 
      }
      
      if (weeks >= 1) {
        return `${weeks} ${weeks > 1 ? 'uger' : 'uge'} siden kl ${hour}.${min}`;
      } else if(days >= 1) {
        return `${days > 1 ? days + ' dage' : 'I går'} kl ${hour}.${min}`;
      } else if(hours >= 1) {
        return `${hours} ${hours > 1 ? ' timer' : 'time'} siden`;
      } else {
        return `${minutes} ${minutes > 1 ? ' minutter' : 'minut'} siden`;
      }
      
    }
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
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
  }

  li section {
    padding: 1rem;
  }

  .title {
    font-weight: bold;
    margin: 5px 0;
  }

  .time {
    text-align: left;
    margin: 5px 0;
    opacity: 0.4;
  }

  .description {
    text-align: left;
    margin: 10px 0;
    line-height: 1.5;
  }

  .ranking {
    text-align: left;
    margin: 0px;
  }

  .devider {
    display: flex;
    justify-content: space-between;
  }

  .devider svg {
    width: 1.5rem;
    height: 1.5rem;
    opacity: 0.4;
    color: black;
  }

  .devider a {
    display: none;
  }

  li:hover .devider a {
    display: block;
  }

</style>
