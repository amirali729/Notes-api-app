import { JwtService } from 'src/services/jwt.service';
import { SignUpUserDto } from '../dto/create-user.dto';
import type { IUserRepository } from '../repository/user.repository.interface';
import { IUserService } from './user.service.interface';
import * as bcrypt from 'bcrypt';
import { SignUpResponse } from '../responses/signup.response';
import { UserRepository } from '../repository/user.repository.impl';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: SignUpUserDto): Promise<SignUpResponse | Error | string> {
    try {
      console.log(user);
      const userfound = await this.userRepository.findUserbyUsername(
        user.username,
      );
      console.log(userfound);
      if (userfound != 'User not found') {
        console.log('hello');
        return new Error('account already created please login');
      }
      console.log('hel');
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await this.userRepository.create({
        username: user.username,
        password: hashedPassword,
        email: user.email,
        createdBy: user.username,
      });
      console.log(createdUser);
      // return createdUser;
      return createdUser;
    } catch (error) {
      // normalize caught value to Error
      return new Error((error as Error)?.message ?? 'unknown error');
    }
  }

  // login(): Promise<any> {
  //   return this.userRepository.signUp();
  // }
}
