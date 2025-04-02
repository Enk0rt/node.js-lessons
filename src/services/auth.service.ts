import { StatusCodesEnum } from "../enums/status-codes.enums";
import { ApiError } from "../errors/api.errors";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(
        user: IUserCreateDTO,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPass(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });
        return { user: newUser, tokens };
    }

    public async signIn(
        dto: any,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);

        if (!user) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
        const isValidPass = await passwordService.comparePass(
            dto.password,
            user.password,
        );

        if (!user.isActive) {
            throw new ApiError(
                "Account is not active",
                StatusCodesEnum.FORBIDDEN,
            );
        }

        if (!isValidPass) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return {
            user,
            tokens,
        };
    }
}

export const authService = new AuthService();
