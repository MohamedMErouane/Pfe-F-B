import { Module } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { PomodoroController } from './pomodoro.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PomodoroController],
  providers: [
    PomodoroService,
    UserService
  ],
})
export class PomodoroModule {}
