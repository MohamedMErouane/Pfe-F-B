import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  create(createMessageDto: CreateMessageDto, clientId : string) {
    const message = {
      name : this.clientToUser[clientId],
      text : createMessageDto.text
    }

    this.messages.push(message)
    return message
  }

  messages : Message[] = [
    {
      name : "Jhone", 
      text : "Hello, World !"
    }
  ]

  clientToUser = {}
   

  findAll() {
    return this.messages;
  }

  identify(name : string, clientId : string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser)
  }

  getClientByName(clientId : string) {
    return this.clientToUser[clientId]
  }
}
