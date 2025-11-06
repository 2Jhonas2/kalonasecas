import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    health(): {
        ok: boolean;
        timestamp: string;
    };
    echo(body: any): {
        received: any;
        ts: string;
    };
}
