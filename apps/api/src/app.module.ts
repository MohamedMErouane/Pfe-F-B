import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { MessagesModule } from './messages/messages.module';
import { TodoModule } from './todo/todo.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { ConnectedUsersModule } from './connected-users/connected-users.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule,
    MessagesModule,
    TodoModule,
    PomodoroModule,
    ConnectedUsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService],
})
export class AppModule {}
