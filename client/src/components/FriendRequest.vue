<template>
  <div class="level">
    <div class="level-left">
      <router-link to="/">{{request.sender.firstName}} {{request.sender.lastName}}</router-link>
    </div>
    <div class="level-right">
        <div class="level-item">
        <a class="button is-white has-text-success" @click="respondedToFriendRequest(true)">
          <span class="icon">
            <i class="fas fa-check"></i>
          </span>
        </a>
      
        <button class="button is-white has-text-danger" @click="respondedToFriendRequest(false)">
          <span class="icon">
            <i class="fas fa-times"></i>
          </span>
        </button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "FriendRequest",
  props:{
    request: {
      required: true,
      type: Object
    }
  },
  methods:{
    ...mapActions(['respondToFriendRequest']),
    //on btn click accepts or rejects friend request
    respondedToFriendRequest(accepted){
      this.respondToFriendRequest({request_id: this.request._id, accepted: accepted})
    }
  }
};
</script>

<style>
</style>