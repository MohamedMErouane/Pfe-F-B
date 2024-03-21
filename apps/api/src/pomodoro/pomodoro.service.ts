import { Injectable } from '@nestjs/common';
import { CreatePomodoroDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class PomodoroService {

  constructor(private prisma : PrismaService){}

  async create(dto: CreatePomodoroDto) {

    console.log('hello in the pomodoro service !')

    const {userId, hours} = dto

    const today = new Date()
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    const pomodoro = await this.prisma.studyTime.findFirst({
      where : {
        userId,
        date
      }
    })

    if(pomodoro){
      return await this.prisma.studyTime.update({
        where : {
          id : pomodoro.id
        },
        data : {
          hours : hours + pomodoro.hours
        }
      })
    }

    return await this.prisma.studyTime.create({
      data : {
        userId,
        date,
        hours 
      }
    })

  }
  async getStates(userId: string): Promise<number[]> {
    const today = new Date();
    const dates = [];
  
    // Generate dates for the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
  
    // Reverse the order of dates to make the current date the last in the array
    const reversedDates = dates.reverse();
  
    console.log("##################################");
    console.log(reversedDates);
    console.log("##################################");
  
    // Fetch study times for each day and calculate total hours
    const totalHoursPromises = reversedDates.map(async (date) => {
      const studyTime = await this.prisma.studyTime.findFirst({
        where: {
          userId,
          date: {
            gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
          },
        },
        select: {
          hours: true,
        },
      });
  
      return studyTime ? studyTime.hours : 0;
    });
  
    const totalHours = await Promise.all(totalHoursPromises);
    console.log(totalHours);


    
    return totalHours;
  }


  findAll() {
    return `This action returns all pomodoro`;
  }

}
