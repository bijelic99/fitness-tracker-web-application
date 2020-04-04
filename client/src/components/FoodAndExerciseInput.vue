<template>
  <div class="panel is-success">
    <div class="panel-heading">Exercise/Food input</div>
    <div class="panel-tabs">
      <a :class="panelShown ? `is-active` : ``" @click="panelShown = true">Exercise</a>
      <a :class="panelShown ? `` : `is-active`" @click="panelShown = false">Food</a>
    </div>
    <div class="panel-block">
      <ExerciseInputComponent v-if="panelShown"/>
      <FoodInputComponent v-if="!panelShown"/>
    </div>
    
  </div>
</template>

<script>
import ExerciseInputComponent from './ExerciseInputComponent'
import FoodInputComponent from './FoodInputComponent'
export default {
  name: "FoodAndExerciseInput",
  components:{
    ExerciseInputComponent,
    FoodInputComponent,
  },
  data(){
    return{
      panelShown: true
    }
  }
};
</script>

<style>
  .panel-height-50{
    height: 50vh;
  }
</style>