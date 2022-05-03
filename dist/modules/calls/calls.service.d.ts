import { Server, Socket } from 'socket.io';
export declare class CallsService {
    server: Server;
    group(data: {
        sender: string;
        groupId: string;
        message: string;
    }, client: Socket): Promise<void>;
    private(data: {
        sender: string;
        receipient: string;
        message: string;
    }, client: Socket): void;
    chatroom(data: {
        sender: string;
        roomId: string;
        message: string;
    }, client: Socket): void;
    getUserfromToken(headers: string): Promise<{
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
    }>;
}
