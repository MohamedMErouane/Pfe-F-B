import { Injectable } from '@nestjs/common';
import { ConnectedUserDto } from './dto';



@Injectable()
export class ConnectedUsersService {
  private connectedUsers: ConnectedUserDto[] = [];

  async create(userDto: ConnectedUserDto) {

    const existingUser = this.connectedUsers.find(user => user.username === userDto.username);
    
    if (existingUser) {
        console.log(`User with username ${userDto.username} already exists.`);
        return existingUser;
    }

    this.connectedUsers.push(userDto);
    console.log(this.connectedUsers);
    return userDto;
}

  async findAll() {
    console.log(this.connectedUsers)
    return this.connectedUsers; // Returning as a promise to be consistent with asynchronous operations
  }

  async remove(username: string) {
    const index = this.connectedUsers.findIndex(user => user.username === username);
    if (index !== -1) {
      this.connectedUsers.splice(index, 1);
      return { success: true };
    }
    return { success: false };
  }
}

