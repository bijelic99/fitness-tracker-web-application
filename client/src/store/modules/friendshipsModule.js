import axios from '../../axiosConfig'

const state = {
    receivedFriendRequests: [],
    sentFriendRequests: [],
    friends: [],
    receivedRequestCheckInterval: null
}

const getters = {
    //gets friend requests
    getReceivedFriendRequests: (state) => state.receivedFriendRequests,
    //returns sent friendRequest, undefined if there is none with that recipient_id
    getSentFriendRequest: (state) => (recipient_id) => state.sentFriendRequests.find(fr => fr.recipient._id === recipient_id),
    getFriends: state => state.friends,
    getIfUserHasSentRequestToUser: state => user_id => state.sentFriendRequests.filter(fr => fr.recipient._id === user_id).length > 0 ? true : false,
    getIfUserHasRequestFromUser: state => user_id => state.receivedFriendRequests.filter(fr=>fr.sender._id === user_id).length > 0 ? true : false,
}

const actions = {
    //fetches sent friend requests from server
    fetchSentFriendRequests: ({ commit, getters }) => {
        return axios.get(`/api/friend-requests/${getters.getCurrentUserId}/sent`).then(({ data }) => {
            commit('SET_SENT_FRIEND_REQUESTS', data)
            console.log('abab')
            return true
        }).catch((err) => {
            console.log(err)
            return false
        })
    },
    //fetches received friend requests from server
    fetchReceivedFriendRequests: ({ commit, getters }) => {
        if (getters.isLoggedIn) {
            return axios.get(`/api/friend-requests/${getters.getCurrentUserId}/received`).then(({ data }) => {
                commit('SET_RECEIVED_FRIEND_REQUESTS', data)
                return true
            }).catch((err) => {
                console.log(err)
                return false
            })
        }
        else return false
    },
    //periodically fetches received friend requests from server, interval is time in second
    periodicallyFetchReceivedFriendRequests: ({ getters, commit, dispatch }, interval) => {
        if (getters.isLoggedIn) {
            var receivedRequestCheckInterval = setInterval(function () {
                dispatch('fetchReceivedFriendRequests')
            }, interval * 1000)
            commit('START_RECEIVED_FRIEND_REQUESTS_INTERVAL', receivedRequestCheckInterval)
        }
    },
    //to be able to receive friend request without refresh we dispatch periodicallyFetchReceivedFriendRequests every n seconds
    startFetchingReceivedFriendRequests: ({ dispatch, getters }) => {
        if (getters.isLoggedIn) {
            dispatch('fetchReceivedFriendRequests')
            dispatch('periodicallyFetchReceivedFriendRequests', 10)
        }
    },
    //stops the timer when exiting the app
    stopFetchingReceivedFriendRequests: ({ commit }) => commit('STOP_RECEIVED_FRIEND_REQUESTS_INTERVAL'),

    //when we accept or decline request this fn is called
    respondToFriendRequest: ({ commit, getters }, { request_id, accepted }) => {
        if (getters.isLoggedIn) {
            return axios.post('/api/friend-requests/respond', {
                request_id: request_id,
                user_id: getters.getCurrentUserId,
                accepted: accepted
            }).then(({ data }) => {
                if (data.successful) {
                    if (accepted) {
                        commit('ADD_FRIEND', data.personA)
                    }
                    commit('RESPOND_TO_FRIEND_REQUEST')
                }
            }).catch(() => false)
        }
        else return false
    },
    //fetches users friendlist from server
    fetchFriends: ({ commit, getters }) => {
        if (getters.isLoggedIn) {
            return axios.get(`/api/users/${getters.getCurrentUserId}/friends`).then(({ data }) => {
                commit('SET_FRIENDS', data)
                return true
            }).catch(() => false)
        }
        else return false
    },
    //sends a friend request
    sendFriendRequest: ({commit, getters}, recipient_id)=>{
        if (getters.isLoggedIn) {
            return axios.post(`/api/friend-requests`,{
                sender_id: getters.getCurrentUserId,
                recipient_id: recipient_id
            }).then(({data})=>commit('ADD_SENT_FRIEND_REQUEST', data))
        }
        else return false
    }

}

const mutations = {
    //sets state of received friend requests
    SET_RECEIVED_FRIEND_REQUESTS: (state, requests) => {
        state.receivedFriendRequests = requests
    },
    SET_SENT_FRIEND_REQUESTS: (state, requests) => {
        state.sentFriendRequests = requests
    },
    //adds the interval to state so we can stop it later
    START_RECEIVED_FRIEND_REQUESTS_INTERVAL: (state, interval) => {
        state.receivedRequestCheckInterval = interval
    },
    //stops the interval and sets null
    STOP_RECEIVED_FRIEND_REQUESTS_INTERVAL: (state) => {
        try {
            clearInterval(state.receivedRequestCheckInterval)
        }
        finally {
            state.receivedRequestCheckInterval = null

        }
    },
    RESPOND_TO_FRIEND_REQUEST: (state, request_id) => {
        state.receivedFriendRequests.delete(request_id)
    },
    ADD_FRIEND: (state, friend_id) => {
        state.friends.push(friend_id)
    },
    SET_FRIENDS: (state, friends) => {
        state.friends = friends
    },
    ADD_SENT_FRIEND_REQUEST: (state, request)=> state.sentFriendRequests.push(request)
}

export default {
    state, getters, actions, mutations
}