<template>
  <div class="container">
    <div class="field">
      <label for class="label">Exercise:</label>
      <div class="control">
        <input type="text" class="input" v-model.trim="input.name" />
        <p v-if="!$v.input.name.required" class="help is-danger">Required</p>
      </div>
    </div>
    <div class="field w-100">
      <label for class="label">Type of exercise:</label>
      <div class="control">
        <div class="select w-100">
          <select class="w-100" v-model="input.input_data.exerciseType">
            <option v-for="type in getExerciseTypes" :key="type" :value="type">{{type}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label for class="label">For how long:</label>
    </div>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          type="text"
          class="input"
          v-model.trim="input.input_data.length"
          placeholder="For how long"
        />
        <p v-if="!$v.input.input_data.length.numeric" class="help is-danger">Needs to be a numeric</p>
      </div>
      <div class="control">
        <span class="select">
          <select v-model="lengthUnit">
            <option value="Hours">Hours</option>
            <option value="Minutes">Minutes</option>
            <option value="Seconds">Seconds</option>
          </select>
        </span>
      </div>
    </div>
    <div class="field">
      <label for class="label">Calories burnt:</label>
      <div class="control">
        <input type="text" class="input" v-model.number="input.value" />
        <p v-if="!$v.input.value.required" class="help is-danger">Required</p>
        <p v-if="!$v.input.value.numeric" class="help is-danger">Needs to be a numeric</p>
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <label class="checkbox">
        <input type="checkbox" v-model="share" />
        Share this accomplishment
      </label>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button
          :disabled="$v.input.$invalid"
          class="button is-link"
          @click="addButtonClick()"
        >Add to your daily exercise</button>
      </div>
    </div>
    <ShareModal
      :isVisible="shareModalVisible"
      :inputProp="input"
      @modalClosed="shareModalClosed()"
    />
    <InfoModal
      :isVisible="infoModalData.visible"
      :modalColor="infoModalData.modalColor"
      :title="infoModalData.title"
      :text="infoModalData.text"
      @infoModalClosed="infoModalData.visible = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ShareModal from "./ShareModal";
import InfoModal from "./InfoModal";
import { required, numeric } from "vuelidate/lib/validators";
export default {
  name: "ExerciseInputComponent",
  components: {
    ShareModal,
    InfoModal
  },
  computed: {
    ...mapGetters(["getPostVisibility", "getExerciseTypes"])
  },
  data() {
    return {
      input: {
        _id: null,
        type: "ExerciseInput",
        name: "",
        value: null,
        input_data: {
          exerciseType: "",
          length: ""
        }
      },
      lengthUnit: "Minutes",
      share: false,
      shareModalVisible: false,
      infoModalData: {
        visible: false,
        modalColor: "is-success",
        title: "",
        text: ""
      }
    };
  },
  validations: {
    input: {
      name: {
        required
      },
      value: {
        required,
        numeric
      },
      input_data: {
        length: {
          numeric
        }
      }
    }
  },
  methods: {
    ...mapActions(["addInput"]),
    async addButtonClick() {
      //Function is triggered once Add to your daily exercise is clicked
      if (!this.$v.input.$invalid) {
        this.input.input_data.length = `${this.input.input_data.length} ${this.lengthUnit}`;
        //If share checkbox is checked open share modal else open modal with either success or fail depending on the addInput() outcome
        var res = await this.addInput(this.input);
        if (res) {
          this.infoModalData.modalColor = "is-success";
          this.infoModalData.title = "Success";
          this.infoModalData.text = "Successfuly added";
          this.input = res
          
        } else {
          this.infoModalData.modalColor = "is-warning";
          this.infoModalData.title = "Error";
          this.infoModalData.text = "An error happened";
          return
        }
        if (this.share) {
          if (!res) this.infoModalData.visible = true;
          else this.shareModalVisible = true;
        }
        if (!this.share) {
          this.infoModalData.visible = true;
          this.clearForm()
        }
      }
    },
    clearForm() {
      this.input._id = null
      this.input.name = "";
      this.input.value = null;
      this.input.input_data.exerciseType = "";
      this.input.input_data.length = "";
    },
    shareModalClosed(){
      this.shareModalVisible = false
      this.clearForm()
    }
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}
</style>