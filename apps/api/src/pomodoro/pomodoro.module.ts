import { Module } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { PomodoroController } from './pomodoro.controller';

@Module({
  controllers: [PomodoroController],
  providers: [PomodoroService],
})
export class PomodoroModule {}
