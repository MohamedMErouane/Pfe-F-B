import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';

import { AtGuard } from 'src/auth/guards';
import { UpdatePasswordDto, UpdateUserDto } from './dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id') // This defines the route for GET requests to /user/:id
  async findById(@Param('id') id: string) { // Use @Param to access route parameters
    return this.userService.findById(id);
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

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }
}
