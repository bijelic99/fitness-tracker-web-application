const state = {
    currentUser: {
        _id: 'asdasdasdfas',
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
    getCurrentUserId: state => state.currentUser._id,
    isLoggedIn: state => state.currentUser ? true : false
}

const actions = {

}

const mutations = {

}

export default {
    state, getters, actions, mutations
}