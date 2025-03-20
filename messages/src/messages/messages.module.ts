import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository], // 다른 클래스들을 위해 의존성으로 사용할 수 있는 것들을 의미
})
export class MessagesModule {}
