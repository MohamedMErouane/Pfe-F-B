import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(dto : CreateTodoDto) {
    const {description, userId} = dto
    return this.prisma.todo.create({
      data: {
        description,
        userId,
        createdAt : new Date(),
        completed : false
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.todo.findMany({
      where: {
        userId,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }

  async update(id: string, completed : boolean) {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data : {
        completed
      }
    });
  }
}
