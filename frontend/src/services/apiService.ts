import axios from "axios";
import { authService } from "./authService";

export const apiService = axios.create({baseURL:'/api'});


apiService.interceptors.request.use(req => {
    const accessToken = authService.getAccessToken()

    if(accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }

    return req
})