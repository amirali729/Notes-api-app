import { UserEntity } from '../model/user.entity';

export type createdUsertypes = {
  username: string;
  email: string;
  password: string;
  createdBy: string;
};

export interface IUserRepository {
  create(user: createdUsertypes): Promise<UserEntity | null>;
  findUserbyUsername(username: string): Promise<UserEntity | null>;
  changedPassword(password: string, userId: number): Promise<UserEntity | null>;
  findUserById(userId: number): Promise<UserEntity | null>;
}
