import axios from '../../axiosConfig'
import moment from 'moment'

const state = {

    publicPosts: [],
    friendsPosts: [],
    privatePosts: [],

    publicPostsPageStatus: {
        nextPage: 1,
        hasMorePages: true
    },
    friendsPostsPageStatus: {
        nextPage: 1,
        hasMorePages: true
    },
    privatePostsPageStatus: {
        nextPage: 1,
        hasMorePages: true
    },

    postVisibility: [
        "Private",
        "Friends",
        "Public"
    ],
    feedFilterOptions: [
        {
            name: "My posts",
            needsToBeLoggedIn: true
        },
        {
            name: "Friends posts",
            needsToBeLoggedIn: true
        },
        {
            name: "Public posts",
            needsToBeLoggedIn: false
        },
        {
            name: "All posts",
            needsToBeLoggedIn: true
        }
    ]
}

const getters = {
    getPosts: state => postVisibilityFilterOption => {
        if (postVisibilityFilterOption === 'Public posts') return state.publicPosts
        else if (postVisibilityFilterOption === 'Friends posts') return state.friendsPosts
        else if (postVisibilityFilterOption === 'My posts') return state.privatePosts
        //puts together all three arrays, creates a map so there areny any duplicates, gets map values and sorts them by createdAt
        else return [...state.publicPosts, ...state.friendsPosts, ...state.privatePosts].sort((a, b) => {
            return moment(a.postedAt).isBetween(b.postedAt) ? -1 : moment(b.postedAt).isBetween(a.postedAt) ? 1 : 0
        }).reduce((map, post) => map.set(post._id, post), new Map()).values()
    },
    //if there are more posts on server returns true else false but for each type 
    getPostsHaveMore: state => postVisibilityFilterOption => {
        if (postVisibilityFilterOption === 'Public posts') return state.publicPostsPageStatus.hasMorePages
        else if (postVisibilityFilterOption === 'Friends posts') return state.friendsPostsPageStatus.hasMorePages
        else if (postVisibilityFilterOption === 'My posts') return state.privatePostsPageStatus.hasMorePages
        else return state.publicPostsPageStatus.hasMorePages || state.friendsPostsPageStatus.hasMorePages || state.privatePostsPageStatus.hasMorePages
    },
    getPostVisibility: state => state.postVisibility,
    getFeedFilterOptions: state => state.feedFilterOptions
}

const actions = {
    addPost: ({ commit, getters }, post) => {
        //called when adding the post
        if (getters.isLoggedIn) {
            post.user = getters.getCurrentUserId
            return axios.post('/api/posts', post).then(({ data }) => {
                commit('ADD_POST', data)
                return true
            }).catch(() => false)
        }
        else return false

    },
    likeDislikePost: ({ commit, getters }, { _id }) => {
        //called when post is liked or disliked
        if (getters.isLoggedIn) {
            return axios.patch(`/api/posts/${_id}/like`, {
                user_id: getters.getCurrentUserId
            }).then(({data})=>{
                commit('LIKE_DISLIKE_POST', data)
                return true
            }).catch(()=>false)
        }
        else return false
    },
    //if there are more public posts available fetches them from server
    fetchPublicPosts: ({ commit, state }) => {
        if (state.publicPostsPageStatus.hasMorePages) {
            return axios.get('/api/posts/public', {
                params: {
                    page: state.publicPostsPageStatus.nextPage,
                    limit: 5
                }
            }).then(({ data }) => {
                commit('APPEND_PUBLIC_POSTS', data)
                return true
            }).catch(() => false)
        }
        else return null
    },
    //if there are more friends posts available fetches them from server
    fetchFriendsPosts: ({ commit, state, getters }) => {
        if (getters.isLoggedIn && state.friendsPostsPageStatus.hasMorePages) {
            return axios.get(`/api/posts/friends/${getters.getCurrentUserId}`, {
                params: {
                    page: state.friendsPostsPageStatus.nextPage,
                    limit: 5
                }
            }).then(({ data }) => {
                commit('APPEND_FRIENDS_POSTS', data)
                return true
            }).catch(() => false)
        }
        else return null
    },
    fetchPrivatePosts: async ({ commit, state, getters }) => {
        if (getters.isLoggedIn && state.privatePostsPageStatus.hasMorePages) {
            return axios.get(`/api/posts/${getters.getCurrentUserId}`, {
                params: {
                    page: state.privatePostsPageStatus.nextPage,
                    limit: 5
                }
            }).then(({ data }) => {
                commit('APPEND_PRIVATE_POSTS', data)
                return true
            }).catch(() => false)
        }
        else return null
    },
    //dispatches action for fetching posts depending on type argument
    fetchMorePosts: async ({ dispatch }, typeToFecth) => {
        if (typeToFecth === 'Public posts') return dispatch('fetchPublicPosts')
        else if (typeToFecth === 'Friends posts') return dispatch('fetchFriendsPosts')
        else if (typeToFecth === 'My posts') return dispatch('fetchPrivatePosts')
        else if (typeToFecth === 'All posts') {
            await dispatch('fetchPrivatePosts')
            await dispatch('fetchFriendsPosts')
            await dispatch('fetchPublicPosts')
            return
        }
    },
    //used to delete post from server and state
    deletePost: ({ commit }, post_id) => {
        return axios.delete(`/api/posts/${post_id}`).then(() => {
            commit('DELETE_POST', post_id)
            return true
        }).catch(() => false)
    },
    //used to edit post from server and state only text title and privacy can be changed
    editPost: ({ commit }, post) => {
        return axios.patch(`/api/posts/${post._id}`, post).then(({ data }) => {
            commit('SET_POST', data)
            return true
        }).catch(() => false)
    }
}

const mutations = {
    ADD_POST: (state, post) => state.privatePosts.push(post),
    //functions add to their state and update page info
    APPEND_PUBLIC_POSTS: (state, { hasNextPage, docs }) => {
        if (hasNextPage) state.publicPostsPageStatus.nextPage++
        state.publicPostsPageStatus.hasMorePages = hasNextPage

        state.publicPosts = [...state.publicPosts, ...docs]
    },
    APPEND_FRIENDS_POSTS: (state, { hasNextPage, docs }) => {
        if (hasNextPage) state.friendsPostsPageStatus.nextPage++
        state.friendsPostsPageStatus.hasMorePages = hasNextPage

        state.friendsPosts = [...state.friendsPosts, ...docs]
    },
    APPEND_PRIVATE_POSTS: (state, { hasNextPage, docs }) => {
        if (hasNextPage) state.privatePostsPageStatus.nextPage++
        state.privatePostsPageStatus.hasMorePages = hasNextPage

        state.privatePosts = [...state.privatePosts, ...docs]
    },
    LIKE_DISLIKE_POST: (state, post) => {
        var posts = [...state.privatePosts, ...state.friendsPosts, ...state.publicPosts]
        posts.filter(p=> p._id === post._id).forEach(p=>p.likes = post.likes)
    },
    CLEAR_DATA: (state) => {
        state.publicPosts = []
        state.friendsPosts = []
        state.privatePosts = []

        state.publicPostsPageStatus = {
            nextPage: 1,
            hasMorePages: true
        }
        state.friendsPostsPageStatus = {
            nextPage: 1,
            hasMorePages: true
        }
        state.privatePostsPageStatus = {
            nextPage: 1,
            hasMorePages: true
        }
    },
    DELETE_POST: (state, post_id) => {
        var index = state.privatePosts.findIndex(post => post._id === post_id)
        state.privatePosts.splice(index, 1)
    },
    SET_POST: (state, post) => {
        var index = state.privatePosts.findIndex(p => p._id === post._id)
        state.privatePosts[index] = post
    }
}

export default {
    state, getters, actions, mutations
}