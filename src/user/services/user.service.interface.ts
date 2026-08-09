import { SignUpUserDto, loginUserDto } from '../dto/create-user.dto';
import { SignUpResponse, LoginResponse } from '../responses/user.response';

export interface IUserService {
  login(user: loginUserDto): Promise<LoginResponse>;
  signUp(user: SignUpUserDto): Promise<SignUpResponse>;
}
