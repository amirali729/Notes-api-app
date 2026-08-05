import { JwtService } from 'src/services/jwt.service';
import { SignUpUserDto } from '../dto/create-user.dto';
import { IUserRepository } from '../repository/user.repository.interface';
import { IUserService } from './user.service.interface';
import * as bcrypt from 'bcrypt';
import { SignUpResponse } from '../responses/signup.response';

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: SignUpUserDto): Promise<SignUpResponse | Error> {
    try {
      const userfound = await this.userRepository.findUserbyUsername(
        user.username,
      );
      if (userfound) {
        return new Error('account already created please login');
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await this.userRepository.create({
        username: user.username,
        password: hashedPassword,
        email: user.email,
        createdby: user.username,
      });
      return createdUser;
    } catch (error) {
      // normalize caught value to Error
      return new Error((error as Error)?.message ?? 'unknown error');
    }
  }

  login(): Promise<any> {
    return this.userRepository.signUp();
  }
}
