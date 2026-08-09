import { JwtService } from 'src/services/jwt.service';
import { SignUpUserDto } from '../dto/create-user.dto';
import type { IUserRepository } from '../repository/user.repository.interface';
import { IUserService } from './user.service.interface';
import * as bcrypt from 'bcrypt';
import { SignUpResponse } from '../responses/signup.response';
import { UserRepository } from '../repository/user.repository.impl';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: SignUpUserDto): Promise<SignUpResponse> {
    console.log(user);
    const userfound = await this.userRepository.findUserbyUsername(
      user.username,
    );
    if (userfound) {
      throw new ConflictException('user already exist');
    }
    console.log('hel');
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

  // login(): Promise<any> {
  //   return this.userRepository.signUp();
  // }
}
