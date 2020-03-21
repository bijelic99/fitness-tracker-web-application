import store from '../index'

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
        input:{
            type: 'Excercise',
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
        input:{
            type: 'Excercise',
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
        input:{
            type: 'Food',
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
    feedFilterOptions:[
        "My posts",
        "Friends posts",
        "Public posts",
        "All posts"
    ]
}

const getters = {
    getPosts: state => state.posts,
    getPostVisibility: state => state.postVisibility,
    getFeedFilterOptions: state => state.feedFilterOptions
}

const actions = {
    addPost: ({commit}, post) => {
        //called when adding the post
        //post request to api will be added later
        commit('ADD_POST', post)
        return true 
    },
    likeDislikePost: ({commit}, {_id}) => {
        //called when post is liked or disliked
        //post request to api will be added later
        commit('LIKE_DISLIKE_POST', _id) 
    }
}

const mutations = {
    ADD_POST: (state, post) => state.posts.push(post),
    LIKE_DISLIKE_POST: (state, _id) => {
        var post = state.posts.find(post=> post._id === _id)
        if(!post.likes.includes(store.getters.getCurrentUser._id))
            post.likes.push(store.getters.getCurrentUser._id)
        else post.likes.pop(post.likes.findIndex(id => id === store.getters.getCurrentUser._id))
        post.likedByCurrentUser = !post.likedByCurrentUser
    },
}

export default {
    state, getters, actions, mutations
}