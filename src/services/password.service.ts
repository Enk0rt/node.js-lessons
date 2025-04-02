import bcrypr from "bcrypt";

class PasswordService {
    public hashPass(password: string): Promise<string> {
        return bcrypr.hash(password, 10);
    }

    public comparePass(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypr.compare(password, hashedPassword);
    }
}

export const passwordService = new PasswordService();
