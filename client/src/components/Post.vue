<template>
  <div class="panel-block">
    <div class="box w-100">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img :src="profilePictureLink" alt="Image" />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p v-if="post.user">
              <strong class="pr-4px"><router-link :to="`/User/${post.user.username}`">{{`${post.user.firstName } ${post.user.lastName}`}}</router-link></strong>
              <small class="pr-4px"><router-link :to="`/User/${post.user.username}`">@{{post.user.username}}</router-link></small>
              <small class="pr-4px">{{timePassed}}</small>
              <small class="pr-4px">
                <span class="icon is-small">
                  <i :class="getInputTypes[post.input.type].icon" />
                </span>
              </small>
              <small class="pr-4px">{{post.input.name}}</small>
              <small class="pr-4px">{{post.input.value.toFixed(2)}}</small>
              <small class="pr-4px">{{getInputTypes[post.input.type].sufix}}</small>
              <br />
              <strong>{{post.title}}</strong>
              <br />
              {{post.text}}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" aria-label="like" @click="likeButtonClick()">
                <span class="icon is-small">
                  <i
                    :class="`${post.likes.includes(getCurrentUserId) ? 'fas' : 'far'} fa-heart`"
                    aria-hidden="true"
                  ></i>
                </span>
              </a>
              <small class="is-small">{{post.likes.length}}</small>
            </div>
            <div class="level-right">
              <small class="is-small">{{post.visibility}}</small>
            </div>
          </nav>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(["likeDislikePost"]),
    likeButtonClick() {
      this.likeDislikePost(this.post);
    }
  },
  computed: {
    ...mapGetters(["getCurrentUserId", "getInputTypes"]),
    timePassed() {
      //returns time passed from post being added
      //gives it in the largest unit that isnt 0
      if(this.post.postedAt){
      if (moment().diff(this.post.postedAt, "days") > 0)
        return `${moment().diff(this.post.postedAt, "days")} days ago`;
      else if (moment().diff(this.post.postedAt, "hours") > 0)
        return `${moment().diff(this.post.postedAt, "hours")} hours ago`;
      else if (moment().diff(this.post.postedAt, "minutes") > 0)
        return `${moment().diff(this.post.postedAt, "minutes")} minutes ago`;
      else return `${moment().diff(this.post.postedAt, "seconds")} seconds ago`;
      }
      return "NaN ago"
    },
    //creates a link so we can get users pic
    profilePictureLink: function() {
      return `${process.env.VUE_APP_SERVER_ADDRESS}api/profile-pictures/${this.post.user.picture_id}/140/140`;
    }
  }
};
</script>

<style>
.w-100 {
  width: 100%;
}
.pr-4px {
  padding-right: 4px;
}
</style>