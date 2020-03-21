const state = {
    currentUser: {
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        profilePicture: '',
        friends: [],
        
    }
}

const getters = {
    getCurrentUser: state => state.currentUser,
    getCurrentUserUsername: state =>  state.currentUser.username,
    getCurrentUserFullName: state =>  `${state.currentUser.firstName} ${state.currentUser.lastName}`,
    isLoggedIn: state => state.currentUser ? true : false
}

const actions = {

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}