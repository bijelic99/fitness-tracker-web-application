<template>
  <div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
      <button class="button is-link" aria-controls="friendRequestsDropdown">
        <span class="icon">
          <i class="fas fa-user-friends"></i>
        </span>
        <span>10</span>
      </button>
    </div>
    <div class="dropdown-menu" id="friendRequestsDropdown" role="menu">
        <div class="dropdown-content">
            <div class="dropdown-item"><FriendRequest/></div>
            <div class="dropdown-item"><FriendRequest/></div>
            <div class="dropdown-item"><FriendRequest/></div>
        </div>
    </div>
  </div>
</template>

<script>
import FriendRequest from './FriendRequest'
export default {
  name: "FriendRequestsDropdown",
  components:{
      FriendRequest
  }
};
</script>

<style>
</style>