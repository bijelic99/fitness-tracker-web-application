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
            <div v-if="post.user">
              <span class="level is-marginless">
                <span class="level-left">
                  <span class="level-item">
                    <strong>
                      <router-link
                        :to="`/User/${post.user.username}`"
                      >{{`${post.user.firstName } ${post.user.lastName}`}}</router-link>
                    </strong>
                    <small class="pr-4px">
                      <router-link :to="`/User/${post.user.username}`">@{{post.user.username}}</router-link>
                    </small>

                    <strong>{{post.title}}</strong>
                  </span>
                </span>
              </span>

              <span class="level">
                <span class="level-left">
                  <small class="pr-4px">{{timePassed}}</small>
                  <small class="pr-4px">
                    <span class="icon is-small">
                      <i :class="getInputTypes[post.input.type].icon" />
                    </span>
                  </small>
                  <small class="pr-4px">{{post.input.name}}</small>
                  <small class="pr-4px">{{post.input.value.toFixed(2)}}</small>
                  <small class="pr-4px">{{getInputTypes[post.input.type].sufix}}</small>
                </span>
                <span class="level-right"></span>
              </span>
              <p>{{post.text}}</p>
            </div>
          </div>
          <nav class="level is-mobile">
            <div v-if="isLoggedIn" class="level-left">
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
            <div v-else class="level-left">
            </div>
            <div class="level-right">
              <div class="level-item">
                <small class="is-small">{{post.visibility}}</small>
              </div>
            </div>
          </nav>
        </div>
        <div class="media-right" v-if="showEditAndDeleteOptions">
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <div class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                <span class="icon is-small">
                  <i class="fas fa-angle-down" />
                </span>
              </div>
            </div>
            <div class="dropdown-menu" id="menu">
              <div class="dropdown-content">
                <a class="dropdown-item">
                  <EditPostModalComponent :post="post"/>
                </a>
                <a class="dropdown-item">
                  <DeletePostModalComponent :post="post"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import DeletePostModalComponent from '../components/DeletePostModalComponent'
import EditPostModalComponent from '../components/EditPostModalComponent'
export default {
  name: "Post",
  components:{
    DeletePostModalComponent, EditPostModalComponent
  },
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
    ...mapGetters(["getCurrentUserId", "getInputTypes", 'isLoggedIn', 'getCurrentUserId']),
    timePassed() {
      //returns time passed from post being added
      //gives it in the largest unit that isnt 0
      if (this.post.postedAt) {
        if (moment().diff(this.post.postedAt, "days") > 0)
          return `${moment().diff(this.post.postedAt, "days")} days ago`;
        else if (moment().diff(this.post.postedAt, "hours") > 0)
          return `${moment().diff(this.post.postedAt, "hours")} hours ago`;
        else if (moment().diff(this.post.postedAt, "minutes") > 0)
          return `${moment().diff(this.post.postedAt, "minutes")} minutes ago`;
        else
          return `${moment().diff(this.post.postedAt, "seconds")} seconds ago`;
      }
      return "NaN ago";
    },
    //creates a link so we can get users pic
    profilePictureLink: function() {
      return `${process.env.VUE_APP_SERVER_ADDRESS}api/profile-pictures/${this.post.user.picture_id}/140/140`;
    },
    showEditAndDeleteOptions: function(){
      return this.post && this.isLoggedIn && this.post.user._id === this.getCurrentUserId 
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
.row-height-adjust {
  line-height: 0.5rem !important;
}
</style>