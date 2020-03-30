import axios from '../../axiosConfig'

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
    addInput: ({ commit, getters }, input) => {
        //for adding a new input
        if (getters.isLoggedIn) {
            input.user_id = getters.getCurrentUserId
            return axios.post('/api/inputs', input).then(({ data }) => {
                commit('ADD_INPUT', data)
                return data
            }).catch(() => false)
        }
        else return false
    }
}

const mutations = {
    ADD_INPUT: (state, input) => state.inputs.push(input)
}

export default {
    state, getters, actions, mutations
}