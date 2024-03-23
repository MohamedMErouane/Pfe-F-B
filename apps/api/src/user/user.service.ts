import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dto';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { userInfo } from 'os';

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
    const newUser = await this.prisma.user.create({
      data : {
        ...dto,
        password : await hash(dto.password, 10)
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

  async findName(id : string){
    const user = await this.prisma.user.findUnique({
      where : {
        id
      }
    })

    const name = user ? `${user.lastName} ${user.firstName}` : 'Unknown User';

    return name
  }

  async updateUser(id : string, dto : UpdateUserDto){

    console.log("hello in update user function")

    const {firstName, lastName, about, facebook, instagram, twitter, linkedIn} = dto

    return this.prisma.user.update({
      where : {
        id
      },
      data : {
        firstName,
        lastName,
        about,
        facebook,
        instagram,
        twitter,
        linkedIn
      }
    })
  }

}
