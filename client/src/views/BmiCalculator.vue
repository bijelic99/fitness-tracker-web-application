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
                v-model.number="input.input_data.height"
                placeholder="Your height"
              />
              <p v-if="!$v.input.input_data.height.required" class="help is-danger">Required</p>
              <p v-if="!$v.input.input_data.height.numeric" class="help is-danger">Needs to be a numeric</p>
              <p v-if="!$v.input.input_data.height.minValue" class="help is-danger">Needs to be more than 100 cm</p>
              <p v-if="!$v.input.input_data.height.maxValue" class="help is-danger">Needs to be less than 240 cm</p>
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
                v-model.number="input.input_data.mass"
                placeholder="Your weight"
              />
              <p v-if="!$v.input.input_data.mass.required" class="help is-danger">Required</p>
              <p v-if="!$v.input.input_data.mass.numeric" class="help is-danger">Needs to be a numeric</p>
              <p v-if="!$v.input.input_data.mass.minValue" class="help is-danger">You can't be lighter than 20 kg</p>
              <p v-if="!$v.input.input_data.mass.maxValue" class="help is-danger">If you are more than 300kg you should consider your life choices</p>
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
                :disabled="$v.input.$invalid"
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
import { required , numeric, minValue, maxValue } from 'vuelidate/lib/validators'
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
        _id: null,  
        type: "BmiInput",
        name: 'BMI',
        value: null,
        input_data:{
          height: null,
          mass: null
        }
      },
      share: false,
      chartData: [],
      //Chart configuration
      options: {
        title: "BMI Chart",
        hAxis: { title: "Height (Centimeters)", minValue: 100, maxValue: 240 },
        vAxis: { title: "Weight (Kilograms)", minValue: 0, maxValue: 260 },
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
  validations:{
    input:{
      input_data:{
        height:{
          required,
          numeric,
          minValue: minValue(100),
          maxValue: maxValue(240)
        },
        mass:{
          required,
          numeric,
          minValue: minValue(20),
          maxValue: maxValue(260)
        }
      }
    }
  },
  mounted() {
    this.chartData = this.bmiDefaultData;
  },
  computed:{
    //used so we can have nice graph, returns matrix of values 
    bmiDefaultData: ()=>{
      var maxh = 241
      var idealBmi_s = [40, 29.9, 25, 18.5]
      var finalData = [["Height", "Obese", "Overweight", "Normal weight", "Underweight"]]
      for(var i = 100; i<maxh; i++){
        var arrayToAdd = [i]
        idealBmi_s.forEach(val=>arrayToAdd.push(Number((val*i*i/10000).toFixed(2))))
        finalData.push(arrayToAdd)
      }
      return finalData
    }
  },
  methods: {
    ...mapActions(["addInput"]),
    async addUsersBmiToChart(height, mass) {
      //takes the default chart data and adds the users input and sets it to current chart data

      var newDataArray = [...this.bmiDefaultData];
      var firstRow = [...newDataArray[0], "me"];
      var restOfArr = newDataArray.slice(1).map(arr => {
        return [...arr, null];
      });
      var newArray = [height, null, null, null, null, mass];
      this.chartData = [firstRow, ...restOfArr, newArray];
    },
    async submitButtonClicked() {
      //adds users bmi to server and graphs, shares it if he wants
      if(!this.$v.input.$invalid){
      this.addUsersBmiToChart(this.input.input_data.height, this.input.input_data.mass);
      this.input.value = this.calculateBmi(this.input.input_data.height, this.input.input_data.mass);
      var returnedInput = await this.addInput(this.input)
      if(returnedInput) {
        this.notificationData.notificationIsSuccess = true
        this.notificationData.notificationVisible = true
        this.input = returnedInput
        }
      else{
        this.notificationData.notificationIsSuccess = false
        this.notificationData.notificationVisible = true
      }}
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