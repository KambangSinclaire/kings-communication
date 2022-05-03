"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallsService = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const cache_utils_1 = require("../../utils/cache.utils");
const tokenizer_util_1 = require("../../utils/tokenizer.util");
let CallsService = class CallsService {
    async group(data, client) {
        let user = await this.getUserfromToken(client.request.headers.authorization);
        console.log("user here is ", user);
        console.log("data here is ", data);
        if (user) {
            let stats = await cache_utils_1.CacheManager.get(user.data.school_id);
            if (stats) {
                stats = JSON.parse(stats);
                stats.messages.chats.general.push(data);
                await cache_utils_1.CacheManager.set(user.data.school_id, stats);
                client.broadcast.emit('response_message', data);
            }
        }
    }
    private(data, client) {
        client.broadcast.emit('response', data);
    }
    chatroom(data, client) {
        client.broadcast.emit('response', data);
    }
    async getUserfromToken(headers) {
        const token = headers.split(' ')[1];
        const secret = await cache_utils_1.CacheManager.get(token);
        if (secret) {
            let user = tokenizer_util_1.Tokenizer.verifyToken({ token, secret });
            return user;
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CallsService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('group'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CallsService.prototype, "group", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('private'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CallsService.prototype, "private", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chatroom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], CallsService.prototype, "chatroom", null);
CallsService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } })
], CallsService);
exports.CallsService = CallsService;
//# sourceMappingURL=calls.service.js.map