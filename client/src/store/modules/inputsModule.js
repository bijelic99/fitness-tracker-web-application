import axios from '../../axiosConfig'

const state = {
    inputs: [

    ],
    inputTypes: {
        'BmiInput': {
            icon: 'fas fa-burn',
            sufix: 'bmi',
            name: 'Bmi input'
        },
        'FoodInput': {
            icon: 'fas fa-hamburger',
            sufix: 'calories added',
            name: 'Food input'
        },
        'ExerciseInput': {
            icon: 'fas fa-dumbbell',
            sufix: 'calories burned',
            name: 'Exercise input'
        }
    },
    foodTypes: [
        'Vegan',
        'Non vegan'
    ],
    exerciseTypes: [
        'Pushups',
        'Situps'
    ],
}

const getters = {
    getInputTypes: state => state.inputTypes,
    getFoodTypes: state => state.foodTypes,
    getExerciseTypes: state => state.exerciseTypes,
    getInputs: state => state.inputs

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
    },
    fetchInputs: ({commit, getters}) =>{
        if (getters.isLoggedIn) {
            return axios.get(`/api/inputs/user/${getters.getCurrentUserId}`).then(({data})=>{
                commit('SET_INPUTS', data)
                return true
            }).catch(()=>false)
        }
    }
}

const mutations = {
    ADD_INPUT: (state, input) => state.inputs.push(input),
    SET_INPUTS: (state, inputs) => state.inputs = inputs,
    CLEAR_DATA: (state)=>{
        state.input = []
    }
}

export default {
    state, getters, actions, mutations
}