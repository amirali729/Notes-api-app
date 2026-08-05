import { UserEntity } from '../model/user.entity';

export type createdUsertypes = {
  username: string;
  email: string;
  password: string;
  createdBy: string;
};

export interface IUserRepository {
  create(user: createdUsertypes): Promise<UserEntity | Error>;
  findUserbyUsername(username: string): Promise<UserEntity | Error>;
}
