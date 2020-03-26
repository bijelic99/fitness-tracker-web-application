<template>
  <div class="container">
    <div class="field">
      <label for class="label">Excercise:</label>
      <div class="control">
        <input type="text" class="input"  v-model="input.name"/>
      </div>
    </div>
    <div class="field w-100">
      <label for class="label">Type of excercise:</label>
      <div class="control">
        <div class="select w-100">
          <select class="w-100">
            <option>Pushups</option>
            <option>Situps</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label for class="label">For how long:</label>
    </div>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input type="text" class="input" v-model="input.value" placeholder="For how long"/>
      </div>
      <div class="control">
        <span class="select">
          <select>
            <option>Hours</option>
            <option>Minutes</option>
            <option>Seconds</option>
          </select>
        </span>
      </div>
    </div>
    <div class="field">
      <label for class="label">Calories burnt:</label>
      <div class="control">
        <input type="text" class="input" v-model="input.value"/>
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <label class="checkbox">
        <input type="checkbox" v-model="share"/>
          Share this accomplishment
      </label>
    </div>
    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-link" @click="addButtonClick()">Add to your daily excercise</button>
      </div>
    </div>
    <ShareModal
      :isVisible="shareModalVisible"
      :inputProp="input"
      @modalClosed="shareModalVisible = false"
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
import {mapGetters, mapActions} from 'vuex'
import ShareModal from './ShareModal'
import InfoModal from "./InfoModal";
export default {
  name: "ExcerciseInputComponent",
  components: {
    ShareModal,
    InfoModal
  },
  computed: {
    ...mapGetters(['getPostVisibility']),
  },
  data() {
    return {
      input: {
        type: "Excercise",
        name: "",
        value: null
      },
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
  methods: {
    ...mapActions(["addExcerciseInput"]),
    addButtonClick() {
      //If share checkbox is checked open share modal else open modal with either success or fail depending on the addInput() outcome
      var res = this.addExcerciseInput(this.input);
      if (res) {
          this.infoModalData.modalColor = "is-success";
          this.infoModalData.title = "Success";
          this.infoModalData.text = "Successfuly added";
        } else {
          this.infoModalData.modalColor = "is-warning";
          this.infoModalData.title = "Error";
          this.infoModalData.text = "An error happened";
        }
      if (this.share) {
        if(!res) this.infoModalData.visible = true;
        else this.shareModalVisible = true;
        }
      if (!this.share) {
        this.infoModalData.visible = true;
      }
    }
  }
};
</script>

<style>
.w-100{
  width: 100%;
}
</style>