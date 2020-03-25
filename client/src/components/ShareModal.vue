<template>
  <div :class="`modal ${isVisible ? 'is-active' : ''}`">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <div class="panel">
          <div class="panel-heading">Share</div>
          <div class="panel-block">
            <div class="level">
              <div class="level-left">
                <small class="pr-4px">
                  <span class="icon is-small">
                    <i :class="getInputTypes[inputProp.type].icon" />
                  </span>
                </small>
                <small class="pr-4px">{{inputProp.name}}</small>
                <small class="pr-4px">{{inputProp.value.toFixed(2)}}</small>
                <small class="pr-4px">{{getInputTypes[inputProp.type].sufix}}</small>
              </div>
              <div class="level-right"></div>
            </div>
          </div>
          <div class="panel-block">
            <div class="field w-100">
              <label class="label">Title:</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Whats your title?"
                  v-model="post.title"
                />
              </div>
            </div>
          </div>
          <div class="panel-block">
            <div class="field w-100">
              <label class="label">Text:</label>
              <div class="control">
                <textarea class="textarea" placeholder="Textarea" v-model="post.text"></textarea>
              </div>
            </div>
          </div>
          <div class="panel-block">
            <div class="field w-100">
              <label class="label">Visibility:</label>
              <div class="select w-100">
                <select class="w-100" v-model="post.visibility">
                  <option v-for="visibility in getPostVisibility" :key="visibility">{{visibility}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="panel-block">
            <div class="field w-100 is-grouped is-grouped-right">
              <div class="control">
                <button class="button is-link" @click="postButtonClicked()">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeTheModal()"></button>
    <InfoModal
      :isVisible="infoModalData.visible"
      :modalColor="infoModalData.modalColor"
      :title="infoModalData.title"
      :text="infoModalData.text"
      @infoModalClosed="infoModalClosed()"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InfoModal from "./InfoModal";
export default {
  name: "ShareModal",
  components: {
    InfoModal
  },
  props: {
    inputProp: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      post: {
        input: null,
        user: null,
        title: "",
        text: "",
        visibility: "Private",
        likes: []
      },
      infoModalData: {
        visible: false,
        modalColor: "is-success",
        title: "",
        text: "",
        //opperationSuccessful is here so we know if we need to close share modal or not
        opperationSuccessful: false
      }
    };
  },
  methods: {
    ...mapActions(["addPost"]),
    closeTheModal() {
      this.$emit("modalClosed");
    },
    postButtonClicked() {
      //adds the post, depending on the outcome shows the modal
      var res = this.addPost(this.post);
      if (res) {
        this.infoModalData.modalColor = "is-success"
        this.infoModalData.title = "Success"
        this.infoModalData.text = "Successfuly added"
        this.infoModalData.opperationSuccessful = true
      } else {
        this.infoModalData.modalColor = "is-warning"
        this.infoModalData.title = "Error"
        this.infoModalData.text = "An error happened"
        this.infoModalData.opperationSuccessful = false
      }
      this.infoModalData.visible = true;
    },
    infoModalClosed(){
      //closes the share modal if op is success leaves it open if not
      this.infoModalData.visible = false
      if(this.infoModalData.opperationSuccessful) this.$emit("modalClosed");
    }
  },
  computed: {
    ...mapGetters(["getPostVisibility", "getInputTypes"])
  }
};
</script>

<style>

.w-100{
    width: 100%;
}
</style>