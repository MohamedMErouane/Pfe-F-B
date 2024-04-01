import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UserService } from './user.service';

import { AtGuard } from 'src/auth/guards';
import { UpdatePasswordDto, UpdateUserDto } from './dto';
import { diskStorage } from 'multer';
import {v4 as uuidv4} from 'uuid'
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { UpdateImageDto } from './dto/update-image.dto';
import { Observable, of } from 'rxjs';
import { User } from '@prisma/client';


export const storage = {
  storage: diskStorage({
    destination: './uploads/profileImages', // Specify your upload directory
    filename: (req, image, callback) => {
      const filename : string= path.parse(image.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension = path.parse(image.originalname).ext


      callback(null, `${filename}${extension}`);
    },
  })
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id') // This defines the route for GET requests to /user/:id
  async findById(@Param('id') id: string) { // Use @Param to access route parameters
    return this.userService.findById(id);
  }

  @Post("email")
  async findByEmail(@Body('email') email: string) {
    console.log('emil')
    return this.userService.findByEmail(email);
  }
  
  @Put('update-password')
  async updatePassword(@Body() dto: UpdatePasswordDto) {
    console.log('password')
    return this.userService.updatePassword(dto);
  }
  
  @Put('email-verified')
  async verifyEmail(@Body('id') id: string) {
    console.log('verif')
    return this.userService.verifyEmail(id);
  }
  
  @Put(':id')
@UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/profileImages', // Specify your upload directory
      filename: (req, image, callback) => {
        console.log('File object:', image); // Add this line to see the file object
        const filename : string= path.parse(image.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension = path.parse(image.originalname).ext
  
        callback(null, `${filename}${extension}`);
      },
    })
  }))
uploadFile(@Param('id') id: string, @UploadedFile() image : Express.Multer.File, @Body() dto : UpdateUserDto){

  if (!image) {
    console.log('no image sent')
    return this.userService.updateUser(id, undefined, dto);
  }

  return this.userService.updateUser(id, image.filename, dto);
}


  @Get('profile/:id')
  async getImage(@Param('id') id: string, @Res() res): Promise<Observable<Object>> {
    const user = await this.findById(id)
    if(!user){
      return null
    }

    // Use join function to construct file path
    const filePath = path.join(process.cwd(), 'uploads', 'profileImages', user.image);
    return of(res.sendFile(filePath));
  }
  
}
