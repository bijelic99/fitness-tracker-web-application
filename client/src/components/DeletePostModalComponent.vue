<template>
  <a class="dropdown-item" @click="showModal()">
    <span class="icon is-small pr-4px">
      <i class="fas fa-trash" />
    </span>
    <span>Delete</span>
    <v-dialog/>
  </a>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "DeletePostModalComponent",
  props: {
      post:{
          required: true,
          type: Object
      }
  },
  methods:{
      ...mapActions(['deletePost']),
      showModal(){
          var post = this.post
          var deletePostFn = this.deletePost
          var modal = this.$modal
          this.$modal.show('dialog',{
              title: 'Warning',
              text: 'Are you sure you want to delete this post?',
              buttons: [
                  {
                      title: 'Yes',
                      handler: async function() {
                          if(post){
                              await deletePostFn(post._id)
                              modal.hide('dialog')
                          }
                      }
                  },
                  {
                      title: 'No',
                      default: true,
                      handler: function(){
                          modal.hide('dialog')
                      }
                  }
              ]
          })
      }
  }
};
</script>

<style>
</style>