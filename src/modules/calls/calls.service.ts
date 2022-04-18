import { Injectable } from '@nestjs/common';
import { SubscribeMessage, MessageBody, WebSocketGateway, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from 'src/redis/redis.service';
import { CacheManager } from 'src/utils/cache.utils';
import { Tokenizer } from 'src/utils/tokenizer.util';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class CallsService {

    @WebSocketServer()
    server: Server;

    // responsible for handling group messages
    @SubscribeMessage('group')
    async group(@MessageBody() data: { sender: string, groupId: string, message: string }, @ConnectedSocket() client: Socket) {

        let user = await this.getUserfromToken(client.request.headers.authorization);
        
        console.log("user here is ", user);
        console.log("data here is ", data);
        
        
        if (user) {
            // find school
            let stats = await CacheManager.get(user.data.school_id);
            if (stats) {
                stats = JSON.parse(stats);
                stats.messages.chats.general.push(data);
                await CacheManager.set(user.data.school_id, stats);
                client.broadcast.emit('response_message', data);
            }
        }
        // client.broadcast.emit('response_message', data);
    }

    // responsible for handling private messages
    @SubscribeMessage('private')
    private(@MessageBody() data: { sender: string, receipient: string, message: string }, @ConnectedSocket() client: Socket) {

        client.broadcast.emit('response', data);
    }

    // responsible for handling private chatroom messages
    @SubscribeMessage('chatroom')
    chatroom(@MessageBody() data: { sender: string, roomId: string, message: string }, @ConnectedSocket() client: Socket) {

        client.broadcast.emit('response', data);
    }


    async getUserfromToken(headers: string) {
        const token = headers.split(' ')[1];
        const secret = await CacheManager.get(token);
        if (secret) {
            let user = Tokenizer.verifyToken({ token, secret })
            return user;
        } else {
            return null
        }
    }
}
