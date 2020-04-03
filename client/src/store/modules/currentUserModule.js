import axios from '../../axiosConfig'
import router from '../../router/index'

const state = {
    currentUser: null,
    token: null
}

const getters = {
    getCurrentUser: state => state.currentUser,
    getCurrentUserUsername: state =>  state.currentUser ? state.currentUser.username : null,
    getCurrentUserFullName: state =>  state.currentUser ? `${state.currentUser.firstName} ${state.currentUser.lastName}` : null,
    getCurrentUserId: state => state.currentUser ? state.currentUser._id : null,
    getToken: state => state.token,
    isLoggedIn: state => state.currentUser ? true : false
}

const actions = {
    //Signs user in, retrieves validation token from server
    async signIn({commit, dispatch}, credentials){
        return await axios.post('/login', credentials).then(({data})=>{
            sessionStorage.setItem('auth-token', data.token)
            sessionStorage.setItem('user', JSON.stringify(data.user))
            commit('SIGN_IN_USER', data)
            axios.defaults.headers['auth-token'] = data.token
            dispatch('startFetchingReceivedFriendRequests')
            router.push('/')
            return true
        }).catch(()=>{
            sessionStorage.removeItem('auth-token')
            sessionStorage.removeItem('user')
            axios.defaults.headers['auth-token'] = ''
            return false
        })
    },
    //Signs out current user
    signOut({commit, dispatch}){
        sessionStorage.removeItem('auth-token')
        sessionStorage.removeItem('user')
        axios.defaults.headers['auth-token'] = ''
        dispatch('stopFetchingReceivedFriendRequests')
        commit('SIGN_OUT_USER')
        router.push('/SignIn')
    },
    //enables for user to continue being logged in after page refresh
    signInFromSessionStorage({commit}){
        var user = sessionStorage.getItem('user')
        var token = sessionStorage.getItem('auth-token')
        if(user !== null && token !== null) commit('SIGN_IN_USER', {user: JSON.parse(user), token: token})
        axios.defaults.headers['auth-token'] = token
        
    },
    //once user has changed the password logs him out, if it isnt a success for any reason returns false
    async changePassword({getters, dispatch}, password){
        if(getters.isLoggedIn){
            await axios.put(`/api/users/${getters.getCurrentUserId}/changePassword`, {password: password}).then(({data})=>{
                if(data.success) {
                    dispatch('signOut')
                    return true
                }
                else return false
            }).catch(()=>false)
        }
        else return false
    },
    //sets new picture for the user
    async changePicture({getters, commit}, {profilePictureForm, functionToFollowTheProgress}){
        if(getters.isLoggedIn){
            await axios.put(`/api/users/${getters.getCurrentUserId}/changeProfilePicture`, profilePictureForm, {
                onUploadProgress: functionToFollowTheProgress
            } ).then(({data})=>{
                var {picture_id} = data
                commit('SET_NEW_PROFILE_PICTURE', picture_id)
                sessionStorage.setItem('user', JSON.stringify(getters.getCurrentUser))
            }).catch(()=>false)
        }
        else return false
    }
}

const mutations = {
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_TOKEN: (state, token) => state.token = token,
    SIGN_IN_USER: (state, { user, token })=>{
        state.currentUser = user
        state.token = token
    },
    SIGN_OUT_USER: (state)=>{
        state.currentUser = null
        state.token = null
    },
    SET_NEW_PROFILE_PICTURE: (state, picture_id)=>{
        state.currentUser.picture_id = picture_id
    }
}

export default {
    state, getters, actions, mutations
}