<template>
  <div class="card w-100">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="profilePictureLink" alt="not loaded" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">
            <router-link :to="`/User/${user.username}`">{{ user.firstName }} {{user.lastName}}</router-link>
          </p>
          <p class="subtitle is-6">
            <router-link :to="`/User/${user.username}`">@{{user.username}}</router-link>
          </p>
        </div>
        <div class="media-right">
          <button
            class="button is-primary"
            v-if="addFriendVisible"
            :disabled="!ableToSendFriendRequest"
            @click="sendRequestBtnClicked()"
          >
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PersonCard",
  props: {
    user: {
      type: Object,
      required: true,
      default: null
    },
    addFriendVisible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
      "getCurrentUserId",
      "isLoggedIn",
      "getFriends",
      "getIfUserHasRequestFromUser",
      "getIfUserHasSentRequestToUser"
    ]),
    profilePictureLink: function() {
      if (this.user && this.user.picture_id) {
        return `${process.env.VUE_APP_SERVER_ADDRESS}api/profile-pictures/${this.user.picture_id}/140/140`;
      } else return "";
    },
    //decides if we can send friend req to user
    //needs to be logged in, cant send to himself, dont already have sent or received requests from user
    ableToSendFriendRequest: function() {
      return (
        this.isLoggedIn &&
        this.user._id !== this.getCurrentUserId &&
        !this.getFriends.includes(this.user._id) &&
        !this.getIfUserHasRequestFromUser(this.user._id) &&
        !this.getIfUserHasSentRequestToUser(this.user._id)
      );
    }
  },
  methods: {
    ...mapActions(["sendFriendRequest"]),
    sendRequestBtnClicked() {
      if (this.ableToSendFriendRequest) {
        this.sendFriendRequest(this.user._id);
      }
    }
  }
};
</script>

<style>
</style>