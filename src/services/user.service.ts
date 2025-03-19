import { IUser, IUserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }
    public create(user: IUserDTO): Promise<IUser> {
        return userRepository.create(user);
    }
    public getById(userId: string): Promise<IUser> {
        return userRepository.getById(userId);
    }
    public async updateById(id: string, updateData: IUserDTO) {
        await userRepository.updateById(id, updateData);
        return await userRepository.getById(id);
    }
    public deleteById(id: string) {
        return userRepository.deleteById(id);
    }
    public deleteAll() {
        return userRepository.deleteAll();
    }
}

export const userService = new UserService();
