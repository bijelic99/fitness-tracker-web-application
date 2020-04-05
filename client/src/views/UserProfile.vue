<template>
  <div class="section" v-if="user">
    <div class="container shadow">
      <div class="container">
        <div class="hero is-halfheight has-background-light">
          <div class="hero-video">
            <figure class="image is-2by1">
              <img :src="imageLink" alt />
            </figure>
          </div>
          <div class="hero-head"></div>
          <div class="hero-body"></div>
          <div class="hero-foot">
            <div class="level p-10px">
              <div class="level-left">
                <h1 class="title">{{user.firstName}} {{user.lastName}}</h1>
              </div>
              <div class="level-right">
                <button class="button" v-if="ableToSendFriendRequest">
                  <span class="icon">
                    <i class="fas fa-plus"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section has-text-weight-medium">
        <div class="columns">
          <div class="column is-one-quarter">Username:</div>
          <div class="column">{{user.username}}</div>
        </div>
        <div class="columns">
          <div class="column is-one-quarter">Email:</div>
          <div class="column">{{user.email}}</div>
        </div>
        <div class="columns">
          <div class="column is-one-quarter">Registered:</div>
          <div class="column">{{registered}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "UserProfile",
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    ...mapActions(["fetchUser", 'sendFriendRequest']),
    async getUser() {
      if (this.username) {
        this.user = await this.fetchUser(this.username);
      }
    },
    sendRequestBtnClicked(){
      if(this.ableToSendFriendRequest){
        this.sendFriendRequest(this.user._id)
      }
    }
  },
  computed: {
    ...mapGetters([
      "isLoggedIn",
      "getCurrentUserId",
      "getFriends",
      "getIfUserHasRequestFromUser",
      "getIfUserHasSentRequestToUser"
    ]),
    imageLink: function() {
      if (this.user)
        return `${process.env.VUE_APP_SERVER_ADDRESS}api/profile-pictures/${this.user.picture_id}/800/400`;
      else return "";
    },
    registered: function() {
      if (this.user) return moment(this.user.registered).format("MMMM Do YYYY");
      else return "";
    },
    ableToSendFriendRequest: function() {
      if (this.user) {
        return (
          this.isLoggedIn &&
          this.user._id !== this.getCurrentUserId &&
          !this.getFriends.includes(this.user._id) &&
          !this.getIfUserHasRequestFromUser(this.user._id) &&
          !this.getIfUserHasSentRequestToUser(this.user._id)
        );
      } else return false;
    }
  },
  watch: {
    username: async function() {
      this.getUser();
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style>
.p-10px {
  padding: 10px;
}
.shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>