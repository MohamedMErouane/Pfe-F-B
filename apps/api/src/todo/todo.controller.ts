import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto';



@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    return this.todoService.findAll(userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('completed') completed: boolean) {
    return this.todoService.update(id, completed );
  }
}
