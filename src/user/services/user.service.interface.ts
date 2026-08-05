import { SignUpUserDto } from '../dto/create-user.dto';
import { LoginResponse } from '../responses/login.response';
import { SignUpResponse } from '../responses/signup.response';

export interface IUserService {
  login(): Promise<LoginResponse>;
  signUp(user: SignUpUserDto): Promise<SignUpResponse>;
}
