<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item is-size-4 has-text-weight-semibold">Crunch Fitness</router-link>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarContent"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarContent" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/About">About</router-link>
        <router-link class="navbar-item" to="/BmiCalculator" v-if="isLoggedIn">BMI Calculator</router-link>
        <router-link class="navbar-item" to="/FindPeople">Find people</router-link>
        <!--
        <div class="navbar-item">
          <div class="field has-addons is-fullwidth">
            <div class="control has-icons-left is-expanded">
              <input class="input" type="text" placeholder="Search for people" />
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </div>
            <div class="control">
              <a class="button is-info">Search</a>
            </div>
          </div>
        </div>
        -->
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="!isLoggedIn">
          <div class="buttons">
            <router-link to="/SignIn" class="button is-primary">Sign in</router-link>
            <router-link to="/SignUp" class="button is-primary">Sign up</router-link>
          </div>
        </div>
        <div class="navbar-item" v-if="isLoggedIn">
          <FriendRequestsDropdown/>
        </div>
        <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
          <a class="navbar-link">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
            <span>{{isLoggedIn ? getCurrentUserFullName : ''}}</span>
          </a>
          <div class="navbar-dropdown">
            <router-link to="/AccountSettings" class="navbar-item">My profile</router-link>
            <a class="navbar-item" @click="signOut()">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FriendRequestsDropdown from '../components/FriendRequestsDropdown'
export default {
  name: "Navbar",
  components:{
    FriendRequestsDropdown
  },
  computed: {
    ...mapGetters(["getCurrentUserFullName", "isLoggedIn"])
  },
  methods: {
    ...mapActions(["signOut"])
  }
};
</script>

<style>
.w-24 {
  width: 50vw;
}
</style>