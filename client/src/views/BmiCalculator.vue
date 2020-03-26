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
              <div class="level-item">
                <div class="field" v-if="input.value">
                  <div class="control">
                    <button
                      class="button is-link is-primary"
                      @click="shareModalData.visible = true"
                    >Share</button>
                  </div>
                </div>
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
          <div class="field w-100 has-addons is-fullwidth">
            <div class="control is-expanded">
              <input
                type="text"
                class="input"
                v-model.number="input.height"
                placeholder="Your height"
              />
            </div>
            <p class="control">
              <a class="button is-static">cm</a>
            </p>
          </div>
        </div>
        <div class="panel-block">
          <div class="field w-100 has-addons is-fullwidth">
            <div class="control is-expanded">
              <input
                type="text"
                class="input"
                v-model.number="input.mass"
                placeholder="Your weight"
              />
            </div>
            <p class="control">
              <a class="button is-static">kg</a>
            </p>
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
    <ShareModal
      :isVisible="shareModalData.visible"
      :inputProp="input"
      @modalClosed="closeShareModal()"
    />
    <div :class="`notification success-notification ${notificationData.notificationVisible ? '' : 'is-hidden'} ${notificationData.notificationIsSuccess ? 'is-success' : 'is-warning'} `">
      <button class="delete" @click="notificationData.notificationVisible = false"/>
      <span v-if="notificationData.notificationIsSuccess">Successfuly added your BMI to the archive</span>
      <span v-else>There was an error while adding to archive</span>
    </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { mapActions } from "vuex";
import ShareModal from "../components/ShareModal";
export default {
  name: "BmiCalculator",
  components: {
    GChart,
    ShareModal
  },
  data() {
    return {
      notificationData: {
        notificationVisible: false,
        notificationIsSuccess: false
      },
      shareModalData: {
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
        ["Height", "Obese", "Overweight", "Normal weight", "Underweight"],
        [150, 65, 55, 42, 0],
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
    async submitButtonClicked() {
      //adds users bmi to server and graphs, shares it if he wants
      this.addUsersBmiToChart(this.input.height, this.input.mass);
      this.input.value = this.calculateBmi(this.input.height, this.input.mass);
      if(await this.addBmiInput(this.input)) {
        this.notificationData.notificationIsSuccess = true
        this.notificationData.notificationVisible = true
        }
      else{
        this.notificationData.notificationIsSuccess = false
        this.notificationData.notificationVisible = true
      }
    },
    //Function for bmi calculation
    calculateBmi: (height, mass) => mass / ((height / 100) * (height / 100)),
    closeShareModal() {
      this.shareModalData.visible = false;
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
.success-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>