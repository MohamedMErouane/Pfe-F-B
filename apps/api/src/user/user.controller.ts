import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';

import { AtGuard } from 'src/auth/guards';
import { UpdatePasswordDto } from './dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("id")
  async findById(@Body("id") id : string){
    return this.userService.findById(id)
  }

  @Post("email")
  async findByEmail(@Body('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Put('update-password')
  async updatePassword(@Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(dto);
  }

  @Put('email-verified')
  async verifyEmail(@Body('id') id: string) {
    return this.userService.verifyEmail(id);
  }
}
