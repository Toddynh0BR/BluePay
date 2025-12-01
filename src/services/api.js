import axios from "axios";

export const api = axios.create({
    baseURL: "https://pay-blue.onrender.com"
})
