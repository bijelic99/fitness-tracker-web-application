<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import { mapActions } from 'vuex'
export default {
  components:{
    Navbar
  },
  methods:{
    ...mapActions(['signInFromSessionStorage', 'startFetchingReceivedFriendRequests', 'stopFetchingReceivedFriendRequests', 'fetchFriends'])
  },
  mounted(){
    this.signInFromSessionStorage()
    this.fetchFriends()
    this.startFetchingReceivedFriendRequests()
  },
  beforeDestroy(){
    this.stopFetchingReceivedFriendRequests()
  }

}
</script>

<style>

</style>
