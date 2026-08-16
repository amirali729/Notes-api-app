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
      const user = await this.prisma.user.findFirst({
        where: {
          username: username,
          isDeleted: false,
        },
      });
      return user;
    } catch {
      throw new Infrastructure();
    }
  }
  async changedPassword(
    newPassword: string,
    userId: number,
  ): Promise<UserEntity> {
    try {
      const newUpdatedTime = new Date();
      const userpassword = await this.prisma.user.update({
        where: {
          id: userId,
          isDeleted: false,
        },
        data: {
          password: newPassword,
          updatedAt: newUpdatedTime,
        },
      });
      return userpassword;
    } catch {
      throw new Infrastructure();
    }
  }

  async findUserById(userId: number): Promise<UserEntity | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
          isDeleted: false,
        },
      });

      return user;
    } catch {
      throw new Infrastructure();
    }
  }
}
