<template>
  <div class="panel">
    <div class="panel-heading">
      <div class="level">
        <div class="level-left">
          <span>Feed</span>
        </div>
        <div class="level-right">
          <div class="select is-small">
            <select v-model="selectedFilter">
              <option v-for="filter in feedFilterOptions" :value="filter.name" :key="filter.name">{{filter.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <Post v-for="post in getPosts(selectedFilter)" :key="post._id" :post="post" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  },
  data(){
    return{
      selectedFilter: 'Public posts'
    }
  },
  methods:{
    ...mapActions(['fetchPublicPosts'])
  },
  mounted(){
    this.fetchPublicPosts()
  }
};
</script>

<style>
</style>