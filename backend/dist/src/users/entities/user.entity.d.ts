export declare class User {
    id: number;
    email: string;
    password: string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
