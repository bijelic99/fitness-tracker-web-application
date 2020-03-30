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
    fetchPublicPosts: ({ commit, state }) => {
        if (state.publicPostsPageStatus.hasMorePages) {
            return axios.get('/api/posts/public', {
                params: {
                    page: state.publicPostsPageStatus.nextPage,
                    limit: 10
                }
            }).then(({ data }) => {
                commit('APPEND_PUBLIC_POSTS', data)
                return true
            }).catch(() => false)
        }
        else return null
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