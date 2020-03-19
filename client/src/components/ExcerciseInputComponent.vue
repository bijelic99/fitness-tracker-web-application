<template>
  <div class="container">
    <div class="field">
      <label for class="label">Food name:</label>
      <div class="control">
        <input type="text" name id class="input" />
      </div>
    </div>
    <div class="field">
      <label for class="label">Nutritional value:</label>
      <div class="control">
        <input type="text" name id class="input" />
      </div>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-link">Add to your daily intake</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExcerciseInputComponent"
};
</script>

<style>
</style>