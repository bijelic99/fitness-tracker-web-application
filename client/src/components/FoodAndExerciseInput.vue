<template>
  <div class="panel is-success">
    <div class="panel-heading">Excercise/Food input</div>
    <div class="panel-tabs">
      <a :class="panelShown ? `is-active` : ``" @click="panelShown = true">Excercise</a>
      <a :class="panelShown ? `` : `is-active`" @click="panelShown = false">Food</a>
    </div>
    <div class="panel-block">
      <ExcerciseInputComponent v-if="panelShown"/>
      <FoodInputComponent v-if="!panelShown"/>
    </div>
    
  </div>
</template>

<script>
import ExcerciseInputComponent from './ExcerciseInputComponent'
import FoodInputComponent from './FoodInputComponent'
export default {
  name: "FoodAndExerciseInput",
  components:{
    ExcerciseInputComponent,
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