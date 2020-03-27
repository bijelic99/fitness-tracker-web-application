<template>
  <div class="section">
    <div class="container sign-up-container">
      <div class="panel">
        <p class="panel-heading">Sign up</p>
        <div class="panel-block">
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left">
              <input type="text" :class="`input ${$v.user.username.$invalid ? 'is-danger' : ''}`" placeholder="Your username" v-model="user.username" />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <div v-if="$v.user.username.$invalid">
            <p v-if="!$v.user.username.required" class="help is-danger">Username is requierd</p>
            <p v-if="!$v.user.username.unique" class="help is-danger">This username is not unique</p>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field">
            <label class="label">First name</label>
            <div class="control">
              <div class="control has-icons-left">
                <input type="text" class="input" placeholder="Your last name" v-model="user.firstName"/>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
            <label class="label">Last name</label>
            <div class="control">
              <div class="control has-icons-left">
                <input type="text" class="input" placeholder="Your first name" v-model="user.lastName"/>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left">
              <input type="email" class="input" placeholder="Your email" v-model="user.email"/>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope" />
              </span>
            </div>
            <p class="help is-danger">This username is available</p>
          </div>
        </div>
        <div class="panel-block">
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left">
              <input type="password" class="input" placeholder="Your password" v-model="user.password"/>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <p class="help is-danger">This username is available</p>
            <label class="label">Repeat password</label>
            <div class="control has-icons-left">
              <input type="password" class="input" placeholder="Confirm your passowrd" v-model="user.repeatPassword"/>
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </div>
            <p class="help is-danger">This username is available</p>
          </div>
        </div>
        <div class="panel-block">
          <div class="file has-name is-fullwidth w-100">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">Choose a profile picture...</span>
              </span>
              <span class="file-name">Screen Shot 2017-07-29 at 15.54.25.png</span>
            </label>
          </div>
        </div>
        <div class="panel-block">
          <div class="field">
            <div class="control">
              <a class="button is-primary w-100" @click="registerClicked()">Register</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axiosConfig";
import { required, minLength, alphaNum, email, sameAs, maxLength } from 'vuelidate/lib/validators'
export default {
  name: "SignUp",
  data() {
    return {
      user: {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        firstName: "",
        lastName: "",
        picture: null 
      },
      notificationWindowData: {}
    };
  },
  validations: {
    user:{
      username:{
        required,
        async isUnique(value){
          return await axios.post('localhost:5000/register/is-username-taken',{username: value}).then(({data}) => data.isTaken).catch(err=>{
            console.log(err)
            return false
          })
        }
      },
      password:{
        required,
        minLength: minLength(8),
        maxLength: maxLength(64),
        alphaNum,
      },
      repeatPassword:{
        required,
        sameAs: sameAs('user.password')
      },
      email: {
        required,
        email,
        async isUnique(value){
          return await axios.post('/register/is-email-taken',{username: value}).then(({data}) => data.isTaken).catch(err=>{
            console.log(err)
            return false
          })
        }
      }
    }
  },
  methods:{
    registerClicked(){

    }
  },
  mounted(){
    console.log(this.$v)
  }
};
</script>

<style scoped>
.sign-up-container {
  max-width: 40vw;
}
.w-100,
.field {
  width: 100%;
}
</style>