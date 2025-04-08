import { IAuth } from "../interfaces/IAuth";
import { IUser } from "../interfaces/IUser";
import { urls } from "../constants/urls";
import { apiService } from "./apiService";
import { ITokens } from "../interfaces/ITokens";
import { IResponse } from "../types/IResponse";

const _accessToken = "accessToken";
const _refreshToken = "refreshToken";

export const authService = {
    register(user: IAuth): IResponse<IUser> {
        return apiService.post(urls.auth.register, user);
    },
    async login(user: IAuth): Promise<IUser> {
        const { data } = await apiService.post<ITokens>(urls.auth.login, user);
        this.setTokens(data);
        return await this.me();
    },

    setTokens({tokens :{ accessToken, refreshToken }}: ITokens) {
        localStorage.setItem(_accessToken, accessToken);
        localStorage.setItem(_refreshToken, refreshToken);
    },

    getAccessToken():string{
       return localStorage.getItem(_accessToken) || ''
    },

    getRefreshToken():string{
        return localStorage.getItem(_refreshToken) || ''
    },

    me(): Promise<IUser> {
        return apiService(urls.auth.me);
    },

};