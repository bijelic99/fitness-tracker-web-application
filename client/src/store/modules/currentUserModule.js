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
    async signIn({commit}, credentials){
        return await axios.post('/login', credentials).then(({data})=>{
            sessionStorage.setItem('auth-token', data.token)
            sessionStorage.setItem('user', JSON.stringify(data.user))
            commit('SIGN_IN_USER', data)
            axios.defaults.headers['auth-token'] = data.token
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
    signOut({commit}){
        sessionStorage.removeItem('auth-token')
        sessionStorage.removeItem('user')
        axios.defaults.headers['auth-token'] = ''
        commit('SIGN_OUT_USER')
        router.push('/SignIn')
    },
    //enables for user to continue being logged in after page refresh
    signInFromSessionStorage({commit}){
        var user = sessionStorage.getItem('user')
        var token = sessionStorage.getItem('auth-token')
        if(user !== null && token !== null) commit('SIGN_IN_USER', {user: JSON.parse(user), token: token})
        
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
    }
}

export default {
    state, getters, actions, mutations
}