import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

// 이 클래스를 DI 컨테이너에 등록하기 위해 표시하는 것
@Injectable()
export class MessagesService {
  constructor(public messagesRepo: MessagesRepository) {}

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
