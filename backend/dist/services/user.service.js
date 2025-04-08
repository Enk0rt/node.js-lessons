import { StatusCodesEnum } from "../enums/status-codes.enums";
import { ApiError } from "../errors/api.errors";
import { userRepository } from "../repositories/user.repository";
class UserService {
    getAll() {
        return userRepository.getAll();
    }
    async getById(userId) {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not fount", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }
    getByEmail(email) {
        return userRepository.getByEmail(email);
    }
    async updateById(id, updateData) {
        const user = await userRepository.updateById(id, updateData);
        if (!user) {
            throw new ApiError("User not fount", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.getById(id);
    }
    async deleteById(id) {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ApiError("User not fount", StatusCodesEnum.NOT_FOUND);
        }
        await userRepository.deleteById(id);
    }
    deleteAll() {
        return userRepository.deleteAll();
    }
    async isEmailUnique(email) {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError("User is already exists", StatusCodesEnum.BAD_REQUEST);
        }
    }
    async isActive(id) {
        const user = await this.getById(id);
        return user.isActive;
    }
    blockUser(id) {
        return userRepository.blockUser(id);
    }
    unBlockUser(id) {
        return userRepository.unBlockUser(id);
    }
}
export const userService = new UserService();
