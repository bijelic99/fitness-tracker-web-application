<template>
  <div class="container">
    <div class="field">
      <label for class="label">Excercise:</label>
      <div class="control">
        <input type="text" class="input" />
      </div>
    </div>
    <div class="field">
      <label for class="label">Calories burnt:</label>
      <div class="control">
        <input type="text" class="input" />
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <label class="checkbox">
        <input type="checkbox" />
          Share this accomplishment
      </label>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-link">Add to your daily excercise</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "ExcerciseInputComponent",
  computed: {
    ...mapGetters(['getPostVisibility']),
  }
};
</script>

<style>
</style>