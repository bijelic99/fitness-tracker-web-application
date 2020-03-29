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
    ...mapActions(['signInFromSessionStorage'])
  },
  mounted(){
    this.signInFromSessionStorage()
  }
}
</script>

<style>

</style>
