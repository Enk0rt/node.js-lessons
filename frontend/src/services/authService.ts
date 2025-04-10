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
        const {data:me} = await this.me()
        return me;
    },

    async refresh():Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
            const { data } = await apiService.post<ITokens>(urls.auth.refresh, { refreshToken });
            this.setTokens(data);
        }
    },

    setTokens({ tokens: { accessToken, refreshToken } }: ITokens) {
        localStorage.setItem(_accessToken, accessToken);
        localStorage.setItem(_refreshToken, refreshToken);
    },
    deleteTokens():void{
       localStorage.delete(_accessToken) ;
       localStorage.delete(_refreshToken);

    },
    getAccessToken(): string {
        return localStorage.getItem(_accessToken) || "";
    },

    getRefreshToken(): string {
        return localStorage.getItem(_refreshToken) || "";
    },

    me():IResponse<IUser>  {
     return apiService.get(urls.auth.me);
    },

};