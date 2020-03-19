<template>
  <div class="panel is-success">
    <div class="panel-heading">Excercise/Food input</div>
    <div class="panel-tabs">
      <a class="is-active" href="/">Excercise</a>
      <a href="/">Food</a>
    </div>
    <div class="panel-block">
      <ExcerciseInputComponent/>
    </div>
    
  </div>
</template>

<script>
import ExcerciseInputComponent from './ExcerciseInputComponent'
export default {
  name: "FoodAndExerciseInput",
  components:{
    ExcerciseInputComponent
  }
};
</script>

<style>
  .panel-height-50{
    height: 50vh;
  }
</style>