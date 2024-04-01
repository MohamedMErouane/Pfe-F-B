import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ConnectedUsersModule } from 'src/connected-users/connected-users.module';

@Module({
  imports : [ConnectedUsersModule],
  controllers: [AuthController],
  providers: [
    JwtService,
    UserService,
    AuthService],
})
export class AuthModule {}
