import axios from '../../axiosConfig'

const state = {

    publicPosts: [],
    friendsPosts: [],
    privatePosts: [],

    publicPostsPageStatus: {
        nextPage: 1,
        hasMorePages: true
    },
    friendsPostPageStatus: {
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
        if(postVisibilityFilterOption === 'Public posts') return state.publicPosts
        else if(postVisibilityFilterOption === 'Friends posts') return state.friendsPosts
        else if(postVisibilityFilterOption === 'My posts') return state.privatePosts
        else return [...state.publicPosts, ...state.friendsPosts, ...state.privatePosts].sort((a, b)=> a.postedAt > b.postedAt ? -1 : b.postedAt > a.postedAt ? 1 : 0)
    },
    //if there are more posts on server returns true else false but for each type 
    getPostsHaveMore: state => postVisibilityFilterOption => {
        if(postVisibilityFilterOption === 'Public posts') return state.publicPostsPageStatus.hasMorePages
        else if(postVisibilityFilterOption === 'Friends posts') return state.friendsPostPageStatus.hasMorePages
        else if(postVisibilityFilterOption === 'My posts') return state.privatePostsPageStatus.hasMorePages
        else return state.publicPostsPageStatus.hasMorePages || state.friendsPostPageStatus.hasMorePages || state.privatePostsPageStatus.hasMorePages
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
    likeDislikePost: ({ commit }, { _id }) => {
        //called when post is liked or disliked
        //post request to api will be added later
        console.log('WIP')
        console.log(commit, _id)
    },
    //if there are more posts available fetches them from server
    fetchPublicPosts: async ({ commit, state }) => {
        if (await state.publicPostsPageStatus.hasMorePages) {
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
    //dispatches action for fetching posts depending on type argument
    fetchMorePosts: async ({ dispatch }, typeToFecth) => {
        if(typeToFecth === 'Public posts') return dispatch('fetchPublicPosts')
        else if(typeToFecth === 'Friends posts') return dispatch('fetchFriendsPosts')
        else if(typeToFecth === 'My posts') return dispatch('fetchMyPosts')
        else if(typeToFecth === 'All posts') { 
            await dispatch('fetchMyPosts')
            await dispatch('fetchFriendsPosts')
            await dispatch('fetchPublicPosts')
            return
        }
    }
}

const mutations = {
    ADD_POST: (state, post) => state.privatePosts.push(post),
    APPEND_PUBLIC_POSTS: (state, { hasNextPage, docs }) => {
        if (hasNextPage) state.publicPostsPageStatus.nextPage++
        state.publicPostsPageStatus.hasMorePages = hasNextPage

        state.publicPosts = [...state.publicPosts, ...docs]
    }
    /*
    LIKE_DISLIKE_POST: (state, _id) => {
        console.log('WIP')
    }*/
}

export default {
    state, getters, actions, mutations
}