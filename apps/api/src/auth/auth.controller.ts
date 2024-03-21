import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import { CreateAuthDto } from './dto';
import { RtGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService : UserService  
  ) {}

  @Post("signup")
  async signup(@Body() dto : CreateUserDto){
    return this.userService.create(dto)
  } 

  @Post("signin")
  async signin(@Body() dto : CreateAuthDto){
    return this.authService.signin(dto)
  }
  
  @UseGuards(RtGuard)
  @Post("refresh")
  async refreshToken(@Request() req){
    return this.authService.refresh(req.user)
  }
}
