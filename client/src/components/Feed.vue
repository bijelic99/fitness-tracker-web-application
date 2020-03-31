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
              <option
                v-for="filter in feedFilterOptions"
                :value="filter.name"
                :key="filter.name"
              >{{filter.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <Post v-for="post in getPosts(selectedFilter)" :key="post._id" :post="post" />
 
    <infinite-loading @infinite="infiniteScrollTriggered" :distance="10" :identifier="selectedFilter"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Post from "../components/Post";
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "Feed",
  components: {
    Post,
    InfiniteLoading
  },
  computed: {
    ...mapGetters([
      "getPosts",
      "getPostVisibility",
      "getFeedFilterOptions",
      "getPostsHaveMore",
      "isLoggedIn"
    ]),
    feedFilterOptions() {
      //shows only available filter types
      return this.getFeedFilterOptions.filter(
        option =>
          !option.needsToBeLoggedIn ||
          (option.needsToBeLoggedIn && this.isLoggedIn)
      );
    }
  },
  data() {
    return {
      selectedFilter: "Public posts"
    };
  },
  methods: {
    ...mapActions(["fetchPublicPosts", "fetchMorePosts"]),
    //triggered once we reach the end of the pahe, loads more posts, thats so I dont need to have pagination :)
    async infiniteScrollTriggered(state) {     
      await this.fetchMorePosts(this.selectedFilter);
      if(this.getPostsHaveMore(this.selectedFilter)) state.loaded()
      else state.complete()
    }
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}
</style>