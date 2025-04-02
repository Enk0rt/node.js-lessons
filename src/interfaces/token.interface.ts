import { RoleEnum } from "../enums/role.enum";
import { BaseInterface } from "./base.interface";

interface IToken extends BaseInterface {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

type ITokenModel = Pick<IToken, "accessToken" | "refreshToken" | "_userId">;

interface ITokenPayload {
    userId: string;
    role: RoleEnum;
}

type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
type IRefreshToken = Pick<IToken, "refreshToken">;
export { IRefreshToken, IToken, ITokenModel, ITokenPair, ITokenPayload };
