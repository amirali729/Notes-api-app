import { SignUpUserDto, loginUserDto } from '../dto/user.dto';
import { SignUpResponse, LoginResponse } from '../responses/user.response';

export interface IUserService {
  login(user: loginUserDto): Promise<LoginResponse>;
  signUp(user: SignUpUserDto): Promise<SignUpResponse>;
  changedUserPassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<any>;
}
