<template>
  <div class="section">
    <div class="container">
      <div class="panel">
        <div class="panel-heading">BMI Calculator</div>
        <div class="panel-block">
          <div class="container">
            <GChart
              :settings="{ packages: ['corechart'] }"
              type="AreaChart"
              :data="chartData"
              :options="options"
            />
          </div>
        </div>
        <div class="panel-block">
          <div class="field w-100">
            <label class="label">Your height:</label>
            <div class="control">
              <input type="text" class="input" v-model.number="input.height"/>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field w-100">
            <label class="label">Your weight:</label>
            <div class="control">
              <input type="text" class="input" v-model.number="input.mass"/>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field w-100">
            <label class="checkbox">
              <input type="checkbox"/>
              Share this
            </label>
          </div>
        </div>
        <div class="panel-block">
          <div class="field w-100 is-grouped is-grouped-centered">
            <div class="control">
              <button class="button is-link" @click="submitButtonClicked()">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapActions } from 'vuex';
export default {
  name: "BmiCalculator",
  components: {
    GChart
  },
  data() {
    return {
      input: {
        type: "BMI",
        value: null,
        height: null,
        mass: null
      },
      defaultChartData: [
        ["Height", "Under Weight", "Normal Weight", "Over Weight", "Obese"],
        [160, 48, 62, 78, 90],
        [170, 54, 72, 88, 102],
        [180, 60, 82, 98, 112],
        [190, 78, 90, 108, 128],
        [200, 74, 100, 120, 138]
      ],
      chartData: [],
      options: {
        title: "BMI Chart",
        hAxis: { title: "Height (Centimeters)", minValue: 160, maxValue: 200 },
        vAxis: { title: "Weight (Kilograms)", minValue: 0, maxValue: 200 },
        height: 360,
        colors: ["purple", "green", "orange", "red", "blue"],
        isStacked: true,
        series: {
          0: {
            areaOpacity: 0.5,
            color: "purple",
            type: "area",
            visibleInLegend: true
          },
          1: {
            areaOpacity: 0.5,
            color: "green",
            type: "area",
            visibleInLegend: true
          },
          2: {
            areaOpacity: 0.5,
            color: "orange",
            type: "area",
            visibleInLegend: true
          },
          3: {
            areaOpacity: 0.5,
            color: "red",
            type: "area",
            visibleInLegend: true
          },
          4: {
            areaOpacity: 0.5,
            color: "blue",
            type: "area",
            visibleInLegend: true,
            pointSize: 10
          }
        }
      }
    };
  },
  mounted() {
    this.chartData = this.defaultChartData;
  },
  methods: {
    ...mapActions(['addBmiInput']),
    async addUsersBmiToChart(height, mass) {
      //takes the default chart data and adds the users input and sets it to current chart data

      var newDataArray = [...this.defaultChartData];
      var firstRow = [...newDataArray[0], 'me']
      var restOfArr = newDataArray.slice(1).map(arr => {
          
          return [...arr, null]
          })
      var newArray = [height, null, null, null, null, mass]

      this.chartData = [firstRow, ...restOfArr, newArray]

      
    },
    submitButtonClicked(){
        //adds users bmi to server and graphs, shares it if he wants
        this.addUsersBmiToChart(this.input.height, this.input.mass)
        this.input.value = this.calculateBmi(this.input.height, this.input.mass)
        this.addBmiInput(this.input)

    },
    //Function for bmi calculation 
    calculateBmi: (height, mass) => mass/(height*height)
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}
</style>