import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public updateById(id: string, update: IUserUpdateDTO) {
        return User.findByIdAndUpdate(id, { ...update, updatedAt: Date.now() });
    }
    public deleteById(id: string) {
        return User.findByIdAndDelete(id);
    }
    public deleteAll() {
        return User.deleteMany();
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    public blockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true },
        );
    }

    public unBlockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true },
        );
    }
}

export const userRepository = new UserRepository();
