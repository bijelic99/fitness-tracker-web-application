const state = {
    inputs: [
        
    ],
    inputTypes: {
        'BmiInput': {
            icon: 'fas fa-burn',
            sufix: 'bmi'
        },
        'FoodInput': {
            icon: 'fas fa-hamburger',
            sufix: 'calories added'
        },
        'ExcerciseInput': {
            icon: 'fas fa-dumbbell',
            sufix: 'calories burned'
        }
    },
    foodTypes: [
        'Vegan',
        'Non vegan'
    ],
    excerciseTypes: [
        'Pushups',
        'Situps'
    ],
}

const getters = {
    getInputTypes: state => state.inputTypes,
    getFoodTypes: state => state.foodTypes,
    getExcerciseTypes: state => state.excerciseTypes

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