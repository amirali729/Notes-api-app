/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../model/user.entity';
import { createdUsertypes, IUserRepository } from './user.repository.interface';
import { PrismaService } from 'src/db/prisma';
import { Infrastructure } from 'src/exceptions/exception';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: createdUsertypes): Promise<UserEntity | Error | string> {
    try {
      const newUser: UserEntity = await this.prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          createdBy: user.username,
        },
      });
      return newUser;
    } catch {
      throw new Infrastructure();
    }
  }

  async findUserbyUsername(
    username: string,
  ): Promise<UserEntity | Error | string> {
    try {
      console.log(username);
      const user = await this.prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      console.log(user);
      if (!user) {
        return 'User not found';
      }
      return user;
    } catch {
      throw new Infrastructure();
    }
  }
}
