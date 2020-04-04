import axios from '../../axiosConfig'
const state = {
    users: []
}

const getters = {
    getUsers: state => state.users
}

const actions = {
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
    clearSearchResults: ({commit})=>commit('CLEAR_SEARCH_RESULTS')

}

const mutations = {
    SET_SEARCH_RESULTS: (state, users) => {
        state.users = users
    },
    CLEAR_SEARCH_RESULTS: state => state.users = [],
    CLEAR_DATA: (state)=>{
        state.users = []
    }
}

export default {
    state, getters, actions, mutations
}