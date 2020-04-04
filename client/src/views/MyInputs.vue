<template>
  <div class="section">
    <div class="container">
      <div class="panel">
        <div class="panel-heading">
          <div class="level">
            <div class="level-left">My inputs:</div>
            <div class="level-right">
              <div class="field">
                <div class="control">
                  <div class="select">
                    <select  v-model="selectedFilter">
                      <option v-for="type in filterOptions" :key="type.value" :value="type.value">{{type.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-block" v-for="input in filteredInputs" :key="input._id">
            <Input :input="input"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Input from '../components/Input'
export default {
  name: "MyInputs",
  components:{
      Input
  },
  computed: {
    ...mapGetters(['getInputs']),
    //filters visible inputs
    filteredInputs(){
        var inputs = []
        console.log(this.selectedFilter)
        if(this.selectedFilter === "FoodInput") inputs = this.getInputs.filter(input => input.type === "FoodInput")
        else if(this.selectedFilter === "ExerciseInput") inputs = this.getInputs.filter(input => input.type === "ExerciseInput")
        else if(this.selectedFilter === "BmiInput") inputs = this.getInputs.filter(input => input.type === "BmiInput")
        else if(this.selectedFilter === null) inputs = this.getInputs
        return inputs
    }

  },
  data() {
    return {
      filterOptions: [
        {
          name: "Food input",
          value: "FoodInput"
        },
        {
          name: "Exercise input",
          value: "ExerciseInput"
        },
        {
          name: "Bmi input",
          value: "BmiInput"
        },
        {
          name: "All",
          value: null
        }
      ],
      selectedFilter: null
    };
  },
  methods:{
      ...mapActions(['fetchInputs'])
  },
  mounted(){
      this.fetchInputs()
  }
};
</script>

<style>
</style>