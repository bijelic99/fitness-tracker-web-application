<template>
  <div class="section">
    <div class="container">
      <div class="panel">
        <div class="panel-heading">
          <div class="level">
            <div class="level-left">
              <div class="level-item" id="title">BMI Calculator</div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <span v-if="input.value">Your BMI is: {{input.value.toFixed(2)}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="container chart-container">
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
              <input type="text" class="input" v-model.number="input.height" />
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field w-100">
            <label class="label">Your weight:</label>
            <div class="control">
              <input type="text" class="input" v-model.number="input.mass" />
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field w-100">
            <label class="checkbox">
              <input type="checkbox" v-model="share"/>
              Share this
            </label>
          </div>
        </div>
        <div class="panel-block">
          <div class="field w-100 is-grouped is-grouped-centered">
            <div class="control">
              <button
                class="button is-link"
                v-scroll-to="'#title'"
                @click="submitButtonClicked()"
              >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ShareModal :isVisible="shareModalData.visible" :inputProp="input" @modalClosed="closeShareModal()"/>
    <InfoModal :isVisible="infoModalData.visible" :modalColor="infoModalData.modalColor" :title="infoModalData.title" :text="infoModalData.text"/>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapActions } from "vuex";
import ShareModal from '../components/ShareModal'
import InfoModal from '../components/InfoModal'
export default {
  name: "BmiCalculator",
  components: {
    GChart,
    ShareModal,
    InfoModal
  },
  data() {
    return {
      infoModalData:{
        visible: false,
        modalColor: 'success',
        title: '',
        text: ''
      },
      shareModalData:{
        visible: false
      },
      input: {
        type: "BMI",
        value: null,
        height: null,
        mass: null
      },
      share: false,
      defaultChartData: [
        ["Height", "Obese", "Over Weight", "Normal Weight", "Under Weight"],
        [160, 90, 78, 62, 48],
        [170, 102, 88, 72, 54],
        [180, 112, 98, 82, 60],
        [190, 128, 108, 90, 78],
        [200, 138, 120, 100, 74]
      ],
      chartData: [],
      //Chart configuration
      options: {
        title: "BMI Chart",
        hAxis: { title: "Height (Centimeters)", minValue: 160, maxValue: 200 },
        vAxis: { title: "Weight (Kilograms)", minValue: 0, maxValue: 200 },
        height: 360,
        colors: ["red", "orange", "green", "purple", "blue"],
        legend: {
          position: "top",
          maxLines: 2
        },
        series: {
          0: {
            areaOpacity: 1,
            color: "red",
            type: "area",
            visibleInLegend: true
          },
          1: {
            areaOpacity: 1,
            color: "orange",
            type: "area",
            visibleInLegend: true
          },
          2: {
            areaOpacity: 1,
            color: "green",
            type: "area",
            visibleInLegend: true
          },
          3: {
            areaOpacity: 1,
            color: "purple",
            type: "area",
            visibleInLegend: true
          },
          4: {
            areaOpacity: 0,
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
    ...mapActions(["addBmiInput"]),
    async addUsersBmiToChart(height, mass) {
      //takes the default chart data and adds the users input and sets it to current chart data

      var newDataArray = [...this.defaultChartData];
      var firstRow = [...newDataArray[0], "me"];
      var restOfArr = newDataArray.slice(1).map(arr => {
        return [...arr, null];
      });
      var newArray = [height, null, null, null, null, mass];

      this.chartData = [firstRow, ...restOfArr, newArray];
    },
    submitButtonClicked() {
      //adds users bmi to server and graphs, shares it if he wants
      this.addUsersBmiToChart(this.input.height, this.input.mass);
      this.input.value = this.calculateBmi(this.input.height, this.input.mass);
      this.addBmiInput(this.input);
      if(this.share) {
        this.shareModalData.visible = true
      }
    },
    //Function for bmi calculation
    calculateBmi: (height, mass) => mass / ((height / 100) * (height / 100)),
    closeShareModal(){
      this.shareModalData.visible = false
    }
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}
.chart-container {
  overflow-y: hidden;
  overflow-x: auto;
}
</style>