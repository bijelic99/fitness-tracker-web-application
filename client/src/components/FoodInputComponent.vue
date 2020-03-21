<template>
  <div class="container">
    <div class="field">
      <label for class="label">Food name:</label>
      <div class="control">
        <input type="text" class="input" v-model="input.name" />
      </div>
    </div>
    <div class="field">
      <label class="label">Calories:</label>
      <div class="control">
        <input type="text" class="input" v-model="input.value" />
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
        <button class="button is-link" @click="addButtonClick()">Add to your daily intake</button>
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
import InfoModal from "./InfoModal";
import ShareModal from "./ShareModal";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FoodInputComponent",
  components: {
    ShareModal,
    InfoModal
  },
  data() {
    return {
      input: {
        type: "Food",
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
  computed: {
    ...mapGetters(["getPostVisibility"])
  },
  methods: {
    ...mapActions(["addInput"]),
    addButtonClick() {
      //If share checkbox is checked open share modal else open modal with either success or fail depending on the addInput() outcome
      var res = this.addInput(this.input);
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
</style>