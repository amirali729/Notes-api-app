import { UserEntity } from '../model/user.entity';

export interface IUserRepository {
  login(): Promise<UserEntity>;
  signUp(): Promise<UserEntity>;
}
