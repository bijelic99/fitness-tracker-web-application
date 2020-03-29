<template>
  <div class="section">
    <div class="container">
      <div class="panel">
        <div class="panel-heading">
          <div class="field has-addons is-fullwidth">
            <div class="control has-icons-left is-expanded">
              <input class="input" type="text" placeholder="Search for people" />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </div>
            <div class="control">
              <a class="button is-info">Search</a>
            </div>
          </div>
        </div>
        <div class="panel-block">
            <PersonCard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonCard from '../components/PersonCard'
export default {
  name: "FindPeople",
  components:{
      PersonCard
  }
};
</script>

<style>
</style>