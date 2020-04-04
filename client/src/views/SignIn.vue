<template>
  <div class="section">
    <div class="container sign-up-container">
      <div class="panel">
        <p class="panel-heading">Sign in</p>
        <div class="panel-block">
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left">
              <input
                type="text"
                :class="`input ${$v.credentials.username.$invalid ? 'is-danger' : ''}`"
                placeholder="Your username"
                v-model.trim="credentials.username"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <p v-if="!$v.credentials.username.required" class="help is-danger">Field is required</p>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input
                type="password"
                :class="`input ${$v.credentials.password.$invalid ? 'is-danger' : ''}`"
                placeholder="Your password"
                v-model.trim="credentials.password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
              <p v-if="!$v.credentials.password.required" class="help is-danger">Field is required</p>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field">
            <div class="control">
              <a
                class="button is-primary w-100"
                :disabled="$v.credentials.$invalid"
                @click="loginBtnClicked()"
              >Login</a>
              <p v-if="wrongCredentials" class="help is-danger">Username or password are wrong</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "SignIn",
  data() {
    return {
      credentials: {
        username: null,
        password: null
      },
      wrongCredentials: false
    };
  },
  validations: {
    credentials: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions(["signIn"]),
    async loginBtnClicked() {
      if (!this.$v.credentials.$invalid) {
        if (!(await this.signIn(this.credentials)))
          this.wrongCredentials = true;
        else {
          this.wrongCredentials = false;
          this.resetForm();
        }
      }
    },
    resetForm() {
      this.credentials.username = null;
      this.credentials.password = null;
    }
  }
};
</script>

<style>
.sign-up-container {
  max-width: 40vw;
}
.w-100,
.field {
  width: 100%;
}
</style>