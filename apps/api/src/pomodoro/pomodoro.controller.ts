import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { CreatePomodoroDto } from './dto';



@Controller('pomodoro')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Post()
  create(@Body() dto: CreatePomodoroDto) {
    return this.pomodoroService.create(dto);
  }

  @Post('data')
  get(@Body('userId') userId : string){
    return this.pomodoroService.getStates(userId)
  }

  @Get()
  findAll() : Promise<{ userId: string; totalHours: number }[]>  {
    return this.pomodoroService.findAll();
  }
}
