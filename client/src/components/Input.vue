<template>
  <div class="card w-100">
    <div class="card-header">
      <div class="level w-100 p-6px">
        <div class="level-left has-text-weight-semibold	">
          <span class="icon">
            <i :class="`${getInputTypes[input.type].icon}`"></i>
          </span>
          {{ input.name }}
          <span v-if="input.type === 'BmiInput'">
              of {{input.value.toFixed(2)}} kg/m<sup>2</sup>
          </span>
        </div>
        <div class="level-right" v-if="input.type === 'ExerciseInput'">
           <span v-if="input.type === 'ExerciseInput'"> {{ input.input_data.exerciseType }}</span>
        </div>
      </div>
    </div>
    <div class="card-content">
        <div class="container" v-if="input.type === 'ExerciseInput'">
            You did it for: {{input.input_data.length}}
        </div>
        <div class="container" v-if="input.type === 'FoodInput'">
            <p>You ate: {{input.input_data.quantity}}</p>
            <p>The food was {{input.input_data.foodType}}</p>
        </div>
        <div class="container" v-if="input.type === 'BmiInput'">
            <p>You weighed {{input.input_data.mass}} kg</p>
            <p>And had a height of {{input.input_data.height}} cm</p>
        </div>
    </div>
    <div class="card-footer p-6px">
        <small>Time added: {{dateAddedFormated || ' '}}</small>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment'
export default {
  name: "Input",
  props: {
    input: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters(["getInputTypes"]),
    dateAddedFormated(){
        if(this.input.added_at) return moment(this.input.added_at).format("dddd, MMMM Do YYYY, h:mm:ss a")
        else return null
    }
  }
};
</script>

<style>
.p-6px{
    padding: 6px;
}
</style>