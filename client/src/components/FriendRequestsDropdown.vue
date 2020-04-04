<template>
  <div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
      <button class="button is-link" aria-controls="friendRequestsDropdown">
        <span class="icon">
          <i class="fas fa-user-friends"></i>
        </span>
        <span>{{getReceivedFriendRequests.length}}</span>
      </button>
    </div>
    <div class="dropdown-menu" id="friendRequestsDropdown" role="menu">
      <div class="dropdown-content">
        <div class="dropdown-item">
          <router-link to="/FriendList">Friend list</router-link>
        </div>
        <div class="dropdown-divider" />
        <div class="dropdown-item" v-for="request in getReceivedFriendRequests" :key="request._id">
          <FriendRequest :request="request" />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import FriendRequest from "./FriendRequest";
import { mapGetters } from 'vuex';
export default {
  name: "FriendRequestsDropdown",
  components: {
    FriendRequest
  },
  computed:{
    ...mapGetters(['getReceivedFriendRequests'])
  }
};
</script>

<style>
</style>