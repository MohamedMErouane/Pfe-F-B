import { PartialType } from '@nestjs/mapped-types';
import { CreatePomodoroDto } from './create-pomodoro.dto';

export class UpdatePomodoroDto extends PartialType(CreatePomodoroDto) {}
