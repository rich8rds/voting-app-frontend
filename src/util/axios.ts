import axios from 'axios'

// const BASE_URL: String  = 'http://localhost:4000/api/'
const BASE_URL: String  = 'https://votes-app.onrender.com'

const config: {} = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("JWTOKEN")}`
    }
}

const apiGet = (url: String) => {
    return axios.get(`${BASE_URL}${url}`)
}

const apiPost = (url: String, data: {}) => {
    return axios.post(`${BASE_URL}${url}`, data)
}

const apiPut = (url: string, data: {}) => {
    return axios.put(`${BASE_URL}${url}`, data, config);
};


export { apiGet, apiPost, apiPut }