import { StatusCodesEnum } from "../enums/status-codes.enums";
import { ApiError } from "../errors/api.errors";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not fount", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }

    public getByEmail(email: string): Promise<IUser> {
        return userRepository.getByEmail(email);
    }

    public async updateById(
        id: string,
        updateData: Partial<IUser>,
    ): Promise<IUser> {
        const user = await userRepository.updateById(id, updateData);
        if (!user) {
            throw new ApiError("User not fount", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.getById(id);
    }

    public async deleteById(id: string) {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ApiError("User not fount", StatusCodesEnum.NOT_FOUND);
        }
        await userRepository.deleteById(id);
    }

    public deleteAll() {
        return userRepository.deleteAll();
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError(
                "User is already exists",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
    }

    public async isActive(id: string): Promise<boolean> {
        const user = await this.getById(id);
        return user.isActive;
    }

    public blockUser(id: string): Promise<IUser> {
        return userRepository.blockUser(id);
    }
    public unBlockUser(id: string): Promise<IUser> {
        return userRepository.unBlockUser(id);
    }
}

export const userService = new UserService();
