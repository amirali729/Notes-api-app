import { Injectable } from '@nestjs/common';
import { UserEntity } from '../model/user.entity';
import { createdUsertypes, IUserRepository } from './user.repository.interface';
import { PrismaService } from 'src/db/prisma';
import { Infrastructure } from 'src/exceptions/exception';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: createdUsertypes): Promise<UserEntity | null> {
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

  async findUserbyUsername(username: string): Promise<UserEntity | null> {
    try {
      console.log(username);
      const user = await this.prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      return user;
    } catch {
      throw new Infrastructure();
    }
  }
}
