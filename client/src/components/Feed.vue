<template>
  <div class="panel">
    <div class="panel-heading">
      <div class="level">
        <div class="level-left">
          <span>Feed</span>
        </div>
        <div class="level-right">
          <div class="select is-small">
            <select>
              <option v-for="post in feedFilterOptions" :key="post.name">{{post.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <Post v-for="post in getPosts" :key="post._id" :post="post" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Post from "../components/Post";
export default {
  name: "Feed",
  components: {
    Post
  },
  computed: {
    ...mapGetters(["getPosts", "getPostVisibility", "getFeedFilterOptions", "isLoggedIn"]),
    feedFilterOptions(){
      //shows only available filter types
      return this.getFeedFilterOptions.filter(option=>!option.needsToBeLoggedIn || (option.needsToBeLoggedIn && this.isLoggedIn))
    }
  }
};
</script>

<style>
</style>