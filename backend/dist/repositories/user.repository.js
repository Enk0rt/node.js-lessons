import { User } from "../models/user.model";
class UserRepository {
    getAll() {
        return User.find();
    }
    create(user) {
        return User.create(user);
    }
    getById(userId) {
        return User.findById(userId);
    }
    updateById(id, update) {
        return User.findByIdAndUpdate(id, { ...update, updatedAt: Date.now() });
    }
    deleteById(id) {
        return User.findByIdAndDelete(id);
    }
    deleteAll() {
        return User.deleteMany();
    }
    getByEmail(email) {
        return User.findOne({ email });
    }
    blockUser(userId) {
        return User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    }
    unBlockUser(userId) {
        return User.findByIdAndUpdate(userId, { isActive: true }, { new: true });
    }
}
export const userRepository = new UserRepository();
