import { UserEntity } from '../model/user.entity';

export type LoginResponse = {
  user: UserEntity;
  accessToken: string;
  refreshToken: string;
};
