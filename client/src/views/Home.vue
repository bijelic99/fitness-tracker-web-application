<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds"><Feed/></div>
        <div class="column is-one-third"><FoodAndExerciseInput/></div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Feed from '../components/Feed'
import FoodAndExerciseInput from '../components/FoodAndExerciseInput'
export default {
  name: "Home",
  components: {
    Feed, FoodAndExerciseInput
  }
};
</script>
<style>

</style>
