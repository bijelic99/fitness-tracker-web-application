<template>
  <div class="section">
    <div class="container">
      <div class="box">
        <div class="profile-container">
          <div class="image-container">
            <figure>
              <img class="profile-image" :src="profilePictureLink" alt="Profile picture" />
              <figcaption>
                <a @click="$modal.show('profile-picture-change-modal')">Change the profile picture</a>
              </figcaption>
            </figure>
          </div>
          <div class="profile-info-container">
            <div class="profile-info-element">Username:</div>
            <div class="profile-info-element">{{getCurrentUser.username}}</div>
            <div class="profile-info-element">Full name:</div>
            <div class="profile-info-element">{{getCurrentUserFullName}}</div>
            <div class="profile-info-element">Email:</div>
            <div class="profile-info-element">{{getCurrentUser.email}}</div>
            <div class="profile-info-element">Change Password:</div>
            <div class="profile-info-element">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Change password"
                    v-model="changePasswordData.password"
                  />
                  <p v-if="!$v.changePasswordData.password.required" class="help is-danger">Required</p>
                  <p
                    v-if="!$v.changePasswordData.password.minLength"
                    class="help is-danger"
                  >Needs to be 8 or more charachters</p>
                  <p
                    v-if="!$v.changePasswordData.password.maxLength"
                    class="help is-danger"
                  >Cant be more than 64 chars</p>
                  <p
                    v-if="!$v.changePasswordData.password.alphaNum"
                    class="help is-danger"
                  >Needs to be alphanumeric</p>
                </div>
              </div>
            </div>
            <div class="profile-info-element">Repeat Password:</div>
            <div class="profile-info-element">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Repeat password"
                    v-model="changePasswordData.repeatPassword"
                  />
                  <p
                    v-if="!$v.changePasswordData.repeatPassword.required"
                    class="help is-danger"
                  >Required</p>
                  <p
                    v-if="!$v.changePasswordData.repeatPassword.sameAs"
                    class="help is-danger"
                  >Not same as password</p>
                </div>
              </div>
              <div class="field is-grouped is-grouped-right">
                <button
                  class="button is-danger"
                  :disabled="$v.changePasswordData.$invalid"
                  @click="changePasswordBtnClicked()"
                >Change the password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="profile-picture-change-modal">
      <div class="container">
        <div class="panel">
          <div class="panel-heading">Change your profile picture</div>
          <div class="panel-block">
            <div class="level w-100">
              <div class="level-item">
                <div class="file has-name is-boxed">
                  <label class="file-label">
                    <input
                      class="file-input"
                      type="file"
                      @change="pictureSelected"
                      accept="image/png, image/jpeg"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">Choose a file…</span>
                    </span>
                    <span
                      class="file-name"
                    >{{changeProfileImageData.file ? changeProfileImageData.file.name : "You need to select the image"}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-block">
            <div class="field is-grouped is-grouped-centered w-100">
              <div class="control w-100">
                <button
                  class="button is-primary  w-100"
                  :disabled="$v.changeProfileImageData.$invalid"
                  @click="changePictureBtnClicked()"
                >Change the picture</button>
                <p
                  v-if="!$v.changeProfileImageData.file.required"
                  class="help is-danger"
                >You need to select the file</p>
              </div>
            </div>
          </div>
          <div class="panel-block" v-if="changeProfileImageData.uploadInProgress">
            <progress class="progress is-primary" :value="changeProfileImageData.uploadPercent" max="100" />
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  required,
  minLength,
  maxLength,
  alphaNum,
  sameAs
} from "vuelidate/lib/validators/";
export default {
  name: "AccountSettings",
  computed: {
    ...mapGetters(["getCurrentUser", "getCurrentUserFullName"]),
    profilePictureLink: function() {
      return `${process.env.VUE_APP_SERVER_ADDRESS}api/profile-pictures/${this.getCurrentUser.picture_id}/480/480`;
    }
  },
  data() {
    return {
      changePasswordData: {
        password: "",
        repeatPassword: ""
      },
      changeProfileImageData: {
        file: null,
        uploadInProgress: false,
        uploadPercent: 0
      }
    };
  },
  validations: {
    changePasswordData: {
      password: {
        required,
        minLength: minLength(8),
        alphaNum,
        maxLength: maxLength(64)
      },
      repeatPassword: {
        required,
        sameAs: sameAs("password", this)
      }
    },
    changeProfileImageData: {
      file: {
        required
      }
    }
  },
  methods: {
    ...mapActions(["changePassword", 'changePicture']),
    changePasswordBtnClicked() {
      if (!this.$v.changePasswordData.$invalid) {
        this.changePassword(this.changePasswordData.password);
      }
    },
    pictureSelected(e) {
      this.changeProfileImageData.file = e.target.files[0];
    },
    async changePictureBtnClicked(){
      if(!this.$v.changeProfileImageData.$invalid){
        var form = new FormData()
        form.set('profile-picture', this.changeProfileImageData.file, this.changeProfileImageData.file.name)
        this.changeProfileImageData.uploadInProgress = true
        await this.changePicture({profilePictureForm: form, functionToFollowTheProgress: this.setUploadProgress})
        this.changeProfileImageData.uploadInProgress = false
      }
    },
    setUploadProgress(uploadEvent){
      this.changeProfileImageData.uploadPercent = Math.round(
        (uploadEvent.loaded / uploadEvent.total) * 100
      )
    }
  }
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
.profile-image {
  width: 384px;
  height: 384px;
}
</style>