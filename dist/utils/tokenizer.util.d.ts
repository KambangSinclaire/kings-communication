export declare class Tokenizer {
    static verifyToken({ token, secret }: {
        token: any;
        secret: any;
    }): {
        status: boolean;
        data: {
            user_id?: string;
            role_id?: string;
            school_id?: string;
            year_id?: string;
        };
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    };
}
