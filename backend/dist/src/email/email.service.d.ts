import { ConfigService } from "@nestjs/config";
export declare class EmailService {
    private readonly configService;
    private resend;
    private senderEmail;
    constructor(configService: ConfigService);
    sendUserVerificationEmail(to: string, token: string, name_user: string): Promise<void>;
    sendPasswordResetEmail(to: string, resetUrl: string, name_user: string): Promise<void>;
}
