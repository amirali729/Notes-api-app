import { JwtService } from 'src/services/jwt.service';
import { loginUserDto, SignUpUserDto } from '../dto/user.dto';
import type { IUserRepository } from '../repository/user.repository.interface';
import { IUserService } from './user.service.interface';
import * as bcrypt from 'bcrypt';
import { LoginResponse, SignUpResponse } from '../responses/user.response';
import { UserRepository } from '../repository/user.repository.impl';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: SignUpUserDto): Promise<SignUpResponse> {
    const userfound = await this.userRepository.findUserbyUsername(
      user.username,
    );
    if (userfound) {
      throw new ConflictException('user already exist');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this.userRepository.create({
      username: user.username,
      password: hashedPassword,
      email: user.email,
      createdBy: user.username,
    });
    if (!createdUser) {
      throw new InternalServerErrorException('user creation failed');
    }
    return {
      username: createdUser.username,
      email: createdUser.email,
    };
  }

  async login(user: loginUserDto): Promise<LoginResponse> {
    const userFound = await this.userRepository.findUserbyUsername(
      user.username,
    );
    if (!userFound) {
      throw new NotFoundException(
        'username doesnt exist Please first Create account',
        {
          cause: new Error(),
          description: 'user not found',
        },
      );
    }
    const verifyPassword = await bcrypt.compare(
      user.password,
      userFound.password,
    );
    if (!verifyPassword) {
      throw new BadRequestException('your password is incorrect', {
        cause: new Error(),
        description: 'incorrect password',
      });
    }

    const accesstoken = this.jwtService.createAccessToken({
      userId: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
    const refreshToken = this.jwtService.createRefreshToken({
      userId: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
    return {
      username: userFound.username,
      email: userFound.email,
      accessToken: accesstoken,
      refreshToken: refreshToken,
    };
  }

  async changedUserPassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<any> {
    const userFound = await this.userRepository.findUserById(userId);
    if (!userFound) {
      throw new NotFoundException(
        'username doesnt exist Please first Create account',
        {
          cause: new Error(),
          description: 'user not found',
        },
      );
    }
    const verifyPassword = await bcrypt.compare(
      oldPassword,
      userFound.password,
    );
    if (!verifyPassword) {
      throw new BadRequestException('your password is incorrect', {
        cause: new Error(),
        description: 'incorrect password',
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newUserPassword = await this.userRepository.changedPassword(
      hashedPassword,
      userId,
    );
    if (!newUserPassword) {
      throw new InternalServerErrorException('password changed failed');
    }
    const passwordChangedResponse = {
      username: newUserPassword.username,
      updatedAt: newUserPassword.updatedAt,
    };
    return passwordChangedResponse;
  }
}
