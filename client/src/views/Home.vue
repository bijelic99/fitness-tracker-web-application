<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div :class="`column ${isLoggedIn ? 'is-two-thirds': ''}`"><Feed/></div>
        <div v-if="isLoggedIn" class="column is-one-third"><FoodAndExerciseInput/></div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Feed from '../components/Feed'
import FoodAndExerciseInput from '../components/FoodAndExerciseInput'
import { mapGetters } from 'vuex';
export default {
  name: "Home",
  components: {
    Feed, FoodAndExerciseInput
  },
  computed:{
    ...mapGetters(['isLoggedIn']),

  },
  methods:{
  }
};
</script>
<style>

</style>
