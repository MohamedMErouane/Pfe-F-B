import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  private joinedUsers: string[] = [];

  async create(createMessageDto: CreateMessageDto) {
    const user = await this.prisma.user.findUnique({ where: { username: createMessageDto.name } });

    const message = await this.prisma.message.create({
        data: {
            text: createMessageDto.text,
            user: { connect: { id: user.id } }, // Assuming 'id' is the primary key of the User model
        },
    });

    return {
      id : message.id,
      text : message.text,
      name : user.username,
      image : user.image
    }
}

async findAll() {
  const messages = await this.prisma.message.findMany({
    include: {
      user: true,
    },
  });

  // Map each message to the desired object format
  return messages.map(message => ({
    id : message.id,
    text: message.text,
    name: message.user.username, // Assuming 'username' is the property to retrieve the user's name
    image : message.user.image
  }));
}

  async identify(name: string, clientId: string) {
    // Check if the user is already in the joined users array
    if (!this.joinedUsers.includes(clientId)) {
      // If the user is not in the array, add them
      this.joinedUsers.push(clientId);
    }
  }

  async getClientByName(clientId: string) {
    return this.prisma.user
      .findUnique({ where: { id: clientId } })
      .then((user) => user?.username); 
  }
}
