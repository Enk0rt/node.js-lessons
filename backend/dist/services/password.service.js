import bcrypr from "bcrypt";
class PasswordService {
    hashPass(password) {
        return bcrypr.hash(password, 10);
    }
    comparePass(password, hashedPassword) {
        return bcrypr.compare(password, hashedPassword);
    }
}
export const passwordService = new PasswordService();
