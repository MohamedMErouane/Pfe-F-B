import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 5 * 60 * 60 * 1000 

@Injectable()
export class AuthService {
  constructor(
    private jwt : JwtService,
    private userService : UserService  
  ){}

  async signin(dto: CreateAuthDto) {
    const user = await this.validateUser(dto)

    const payload = {
      email : user.email,
      sub : {
        username : user.id
      }
    }

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn : '5h',
      secret : process.env.jwtSecretKey
    })

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn : '7d',
      secret : process.env.jwtRefreshTokenKey
    })

    const expiresIn = new Date().setTime(new Date().getTime() + EXPIRE_TIME)

    return {
      user,
      backendTokens : {
        accessToken, refreshToken, expiresIn
      }
    }
  }

  async refresh(user : any){
    const payload = {
      email : user.email,
      sub : {
          username : user.username
      }
    }

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn : '5h',
      secret : process.env.jwtSecretKey
    })

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn : '7d',
      secret : process.env.jwtRefreshTokenKey
    })

    const expiresIn = new Date().setTime(new Date().getTime() + EXPIRE_TIME)


    return {
      accessToken, 
      refreshToken,
      expiresIn
    }

  }

  async validateUser(dto: CreateAuthDto) {
    const user = await this.userService.findByEmail(dto.email);
  
    if (!user) {
      throw new UnauthorizedException("Email or password is not correct");
    }
  
    if (!user.emailVerified) {
      throw new UnauthorizedException("Please verify your email first!");
    }
  
    if (!(await compare(dto.password, user.password))) {
      throw new UnauthorizedException("Email or password is not correct");
    }
  
    const { password, ...result } = user;
    return result;
  }
  

  }

  


