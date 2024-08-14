import axios from "axios";

const API_BASE_URL = window.env ? window.env.API_BASE_URL : 'http://localhost:8000/api';
const ApiService = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
            Accept: "application/json"

    },
    withCredentials: true, // Important for session-based auth
});

ApiService.interceptors.request.use((config) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')

    if(csrfToken){
        const token = csrfToken.getAttribute("content");

        if(token){
            config.headers["X-CSRF-TOKEN"] = token


        }
    }

    return config
})

export default ApiService
