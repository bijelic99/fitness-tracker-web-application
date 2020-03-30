import axios from '../../axiosConfig'

const state = {
    //Some static data to fill the posts 
    posts: [{
        _id: 'sdasdasdasdd',
        user: {
            _id: 'daadsasdaff',
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            profilePicture: ''

        },
        input: {
            type: 'ExcerciseInput',
            name: 'Push ups',
            value: 500
        },
        title: 'Just did 25 push ups',
        text: 'And burned 500 calories',
        postedAt: Date.now,
        visibility: 'Private',
        likes: []
    },
    {
        _id: 'sdasdasdasd2',
        user: {
            _id: 'daadsasdaff',
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            profilePicture: ''

        },
        input: {
            type: 'ExcerciseInput',
            name: 'Sit ups',
            value: 800
        },
        title: 'Just did 100 sit ups',
        text: 'And burned 800 calories',
        postedAt: Date.now,
        visibility: 'Friends',
        likes: []
    },
    {
        _id: 'sdasdasdasd3',
        user: {
            _id: 'daadsasdaff',
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            profilePicture: ''

        },
        input: {
            type: 'FoodInput',
            name: 'Double hamburger',
            value: 2000
        },
        title: 'Just ate a double hamburger',
        text: 'And gained 2000 calories in the process',
        postedAt: Date.now,
        visibility: 'Public',
        likes: ['asdasdasdfas']
    }],

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
    getPosts: state => state.posts,
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
    }
}

const mutations = {
    ADD_POST: (state, post) => state.posts.push(post),
    /*
    LIKE_DISLIKE_POST: (state, _id) => {
        console.log('WIP')
    }*/
}

export default {
    state, getters, actions, mutations
}