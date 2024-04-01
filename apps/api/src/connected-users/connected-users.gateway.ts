import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ConnectedUsersService } from './connected-users.service';
import { ConnectedUserDto } from './dto';
import { Server } from 'http';
import { Injectable } from '@nestjs/common';


@Injectable()
@WebSocketGateway({
  cors : {
    origin : '*'
  }
})
export class ConnectedUsersGateway {
  constructor(private readonly connectedUsersService: ConnectedUsersService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('online')
  async join(@MessageBody() userDto: ConnectedUserDto) {
    console.log("A user is online");
    await this.connectedUsersService.create(userDto);
    const user = userDto;
    this.server.emit('connected', userDto);
    return userDto
  }

  @SubscribeMessage('findAllUsers')
  findAll() {
    console.log('hello from find all')
    return this.connectedUsersService.findAll();
  }

  @SubscribeMessage('removeConnectedUser')
  async remove(@MessageBody() username: string) {
    await this.connectedUsersService.remove(username);
    const users = await this.connectedUsersService.findAll();
    this.server.emit('connected', users); // Emit 'connected' event with updated list of users
  }
}
