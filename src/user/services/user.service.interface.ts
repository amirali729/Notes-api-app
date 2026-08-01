export interface IUserService {
  login(): Promise<any>;
  signUp(): Promise<any>;
}
