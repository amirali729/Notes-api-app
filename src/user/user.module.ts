import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service.impl';
import { UserRepository } from './repository/user.repository.impl';
import { PrismaService } from 'src/db/prisma';
import { JwtService } from 'src/services/jwt.service';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService, PrismaService],
})
export class UsersModule {}
