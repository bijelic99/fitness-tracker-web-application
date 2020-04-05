<template>
  <div class="level">
    <div class="level-left">
      <router-link :to="`/User/${request.sender.username}`">{{request.sender.firstName}} {{request.sender.lastName}}</router-link>
    </div>
    <div class="level-right">
        <div class="level-item">
        <a class="button is-white has-text-success" @click="respondedToFriendRequest(true)" :disabled="!ableToRespond">
          <span class="icon">
            <i class="fas fa-check"></i>
          </span>
        </a>
      
        <button class="button is-white has-text-danger" @click="respondedToFriendRequest(false)" :disabled="!ableToRespond">
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
  data(){
    return{
      ableToRespond: true
    }
  },
  methods:{
    ...mapActions(['respondToFriendRequest']),
    //on btn click accepts or rejects friend request
    async respondedToFriendRequest(accepted){
      if(this.ableToRespond){
      this.ableToRespond = false
      if( await !this.respondToFriendRequest({request_id: this.request._id, accepted: accepted})) this.ableToRespond = true
      }
    }
  }
};
</script>

<style>
</style>