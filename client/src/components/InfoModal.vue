<template>
  <div :class="`modal ${isVisible ? 'is-active' : ''}`">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div :class="`notification ${modalColor}`">
        <button class="delete" @click="exitButtonClicked()"></button>
        <h1 class="subtitle">{{title}}</h1>
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoModal",
  props: {
    isVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    modalColor: {
      type: String,
      required: false,
      default: "is-primary"
    },
    title: {
      type: String,
      required: false,
      default: ""
    },
    text: {
      type: String,
      required: false,
      default: ""
    }
  },
  methods:{
      exitButtonClicked(){
          this.$emit('infoModalClosed')
      }
  }
};
</script>

<style>
</style>