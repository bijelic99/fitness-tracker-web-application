import axios from '../../axiosConfig'
const state = {
    users: []
}

const getters = {
    getUsers: state => state.users
}

const actions = {
    //sends get request to server with search string as param, returns matching users
    searchForUser({ commit }, searchQuery) {
        axios.get('/api/users/', {
            params: {
                query: searchQuery
            }
        }).then(({ data }) => {
            commit('SET_SEARCH_RESULTS', data)
            return true
        }).catch(() => false)
    },
    clearSearchResults: ({ commit }) => commit('CLEAR_SEARCH_RESULTS'),
    //checks if user is available in state.users if not fetches him from server
    fetchUser({ getters }, username) {
        var user = getters.getUsers.find(usr => usr.username === username)
        if (!user) {
            return axios.get(`/api/users/${username}`).then(({ data }) => data).catch(() => null)
        }
        else return user
    }

}

const mutations = {
    SET_SEARCH_RESULTS: (state, users) => {
        state.users = users
    },
    CLEAR_SEARCH_RESULTS: state => state.users = [],
    CLEAR_DATA: (state) => {
        state.users = []
    }
}

export default {
    state, getters, actions, mutations
}