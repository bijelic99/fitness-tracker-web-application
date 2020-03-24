const state = {
    inputs: [
        {
            type: 'Food',
            name: 'Double hamburger',
            value: 2000
        },
        {
            type: 'Food',
            name: 'Double hamburger',
            value: 2000
        },
        {
            type: 'Food',
            name: 'Double hamburger',
            value: 2000
        }
    ],
    inputTypes: {
        'BMI': {
            icon: 'fas fa-burn',
            sufix: 'bmi'
        },
        'Food': {
            icon: 'fas fa-hamburger',
            sufix: 'calories added'
        },
        'Excercise': {
            icon: 'fas fa-dumbbell',
            sufix: 'calories burned'
        }
    }
}

const getters = {
    getInputTypes: state => state.inputTypes,

}

const actions = {
    addFoodInput: ({ commit }, input)=>{
        //for adding a new input
        commit('ADD_INPUT', input)
        return true
    },
    addExcerciseInput: ({ commit }, input)=>{
        //for adding a new input
        commit('ADD_INPUT', input)
        return true
    },
    addBmiInput: ({ commit }, input)=>{
        //for adding a new input
        commit('ADD_INPUT', input)
        return true
    }
}

const mutations = {
    ADD_INPUT: (state, input) => state.inputs.push(input)
}

export default {
    state, getters, actions, mutations
}