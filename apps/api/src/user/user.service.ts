import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dto';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Injectable()
export class UserService {

  constructor(private prisma : PrismaService){}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where : {
        email : dto.email
      }
    })

    if(user) throw new ConflictException("email duplicated !")

    const username = dto.email.split('@')[0];

    let isUsernameUnique = false;
    let uniqueUsername = username;
    let counter = 1;

    while (!isUsernameUnique) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: uniqueUsername },
      });

      if (!existingUser) {
        isUsernameUnique = true;
      } else {
        uniqueUsername = `${username}${counter}`;
        counter++;
      }
    }
    
    dto.username = uniqueUsername
    dto.image = '1.jpg'
    const newUser = await this.prisma.user.create({
      data : {
        ...dto,
        password : await hash(dto.password, 10),
      }
    })

    const {password, ...result} = newUser
    return result
  }

  async findByEmail(email : string) {
    return await this.prisma.user.findUnique({
      where : {
        email
      }
    }) 
  }

  async findById(id : string) {
    const user =  await this.prisma.user.findUnique({
      where : {
        id
      }
    })

    const {password, ...result} = user
    console.log("this from nestjs ")
    console.log(result)
    return result
  }

  async findByUsername(username : string) {
    const user =  await this.prisma.user.findUnique({
      where : {
        username
      }
    })

    const {password, ...result} = user
    console.log(result)
    return result
  }

  async updatePassword(dto: UpdatePasswordDto) {
    const { id, newPassword } = dto;
    return this.prisma.user.update({
      where: { id },
      data: { password: await hash(newPassword, 10) },
    });
  }

  async verifyEmail(id : string) {

    return this.prisma.user.update({
      where : {id},
      data : {emailVerified : new Date()}
    })
  }

  async updateUser(username: string, image: string | undefined, dto: UpdateUserDto) {
    console.log("hello in update user function");

    const { firstName, lastName, about, facebook, instagram, twitter, linkedIn } = dto;

    // Prepare the update data object
    const updateData: any = {
        firstName,
        lastName,
        about,
        facebook,
        instagram,
        twitter,
        linkedIn
    };

    // Check if image is provided
    if (image !== undefined) {
        updateData.image = image;
    }

    // Update the user record
    return this.prisma.user.update({
        where: {
            username
        },
        data: updateData
    });
}
}
