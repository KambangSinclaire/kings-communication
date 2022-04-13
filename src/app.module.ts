import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './modules/message/message.module';
import { CallsModule } from './modules/calls/calls.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [MessageModule, CallsModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
