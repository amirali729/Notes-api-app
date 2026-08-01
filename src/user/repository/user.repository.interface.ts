export interface IUserRepository {
  login(): Promise<any>;
  signUp(): Promise<any>;
}
