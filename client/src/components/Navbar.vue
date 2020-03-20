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
        <router-link class="navbar-item" to="/">Private Feed</router-link>
        <router-link class="navbar-item" to="/">About</router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>
          <div class="navbar-dropdown">
            <a href="/" class="navbar-item">1</a>
            <a href="/" class="navbar-item">2</a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="field w-24">
            <div class="control">
              <input class="input" type="text" placeholder="Search for people" />
            </div>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/SignIn" class="button is-primary">Sign in</router-link>
            <router-link to="/SignUp" class="button is-primary">Sign up</router-link>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
            <span>Logged in user</span>
          </a>
          <div class="navbar-dropdown">
            <a href="/User" class="navbar-item">My profile</a>
            <a href="/" class="navbar-item">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
.w-24{
  width: 24vw;
}
</style>