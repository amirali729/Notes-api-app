import { IUserRepository } from '../repository/user.repository.interface';
import { IUserService } from './user.service.interface';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  login(): Promise<any> {
    return this.userRepository.login();
  }

  signUp(): Promise<any> {
    return this.userRepository.signUp();
  }
}
