<template>
  <div class="section">
    <div class="container">
      <div class="box">
        <div class="profile-container">
          <div class="image-container">
            <figure>
              <img
                class="profile-image"
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                alt="Profile picture"
              />
              <figcaption>
                <a>Change the profile picture</a>
              </figcaption>
            </figure>
          </div>
          <div class="profile-info-container">
            <div class="profile-info-element">Username:</div>
            <div class="profile-info-element">johndoe</div>
            <div class="profile-info-element">Full name:</div>
            <div class="profile-info-element">John Doe</div>
            <div class="profile-info-element">Email:</div>
            <div class="profile-info-element">johndoe@example.com</div>
            <div class="profile-info-element">Change Password:</div>
            <div class="profile-info-element">
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Change password" />
                </div>
              </div>
            </div>
            <div class="profile-info-element">Repeat Password:</div>
            <div class="profile-info-element">
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Change password" />
                </div>
                
              </div>
              <div class="field is-grouped is-grouped-right">
                <button class="button is-danger">Change the password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User"
};
</script>

<style>
.profile-container {
  display: grid;
  grid-template-columns: 4fr 8fr;
}
.image-container {
  padding: 12px;
}
.profile-info-container {
  display: grid;
  grid-template-columns: 4fr 8fr;

  padding: 12px;
}
.profile-image{
  width: 384px;
  height: 384px;
}
</style>