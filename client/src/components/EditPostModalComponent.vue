<template>
  <a class="dropdown-item" @click="showModal()" v-if="editedPost">
    <span class="icon is-small pr-4px">
      <i class="fas fa-edit" />
    </span>
    <span>Edit</span>
    <modal name="editModal" height="auto">
      <div class="panel">
        <div class="panel-heading is-primary">Edit</div>
        <div class="panel-block">
          <div class="field w-100">
            <label class="label">Title</label>
            <div class="control">
              <input type="text" class="input" v-model="editedPost.title"/>
            </div>
          </div>
        </div>
        <div class="panel-block">
            <div class="field w-100">
            <label class="label">Text</label>
            <div class="control">
              <textarea type="text" class="textarea" v-model="editedPost.text"/>
            </div>
          </div>
        </div>
        <div class="panel-block">
            <div class="field w-100">
            <label class="label">Visibility</label>
            <div class="control">
              <div class="select  w-100">
                  <select class=" w-100" v-model="editedPost.visibility">
                      <option v-for="postVisibility in getPostVisibility" :key="postVisibility" :value="postVisibility">{{postVisibility}}</option>
                  </select>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-block"></div>
        <div class="panel-block">
          <div class="field is-grouped is-grouped-centered w-100">
            <div class="control">
              <button class="button is-link" @click="editButtonClicked()">Edit</button>
            </div>
            <div class="control">
              <button class="button is-link is-light" @click="$modal.hide('editModal')">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </a>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditPostModalComponent",
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed:{
      ...mapGetters(['getPostVisibility'])
  },
  data(){
      return{
          editedPost: null
      }
  },
  methods: {
    ...mapActions(["editPost"]),
    showModal() {
      this.$modal.show("editModal");
    },
    async editButtonClicked(){
        if(await this.editPost(this.editedPost)) this.$modal.hide('editModal')
        
    }
  },
  mounted(){
      this.editedPost = this.post
  }
};
</script>

<style>
</style>