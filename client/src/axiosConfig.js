import axios from 'axios'

const HTTP = axios.create({
    //baseURL: process.env.VUE_APP_SERVER_ADDRESS,
    headers: {
        'auth-token': ''
    }
})

export default HTTP