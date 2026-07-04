import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "https://chatifybackend-pms9.onrender.com" :"/api",
    withCredentials:true,
})
