import { IUserRepository } from './user.repository.interface';

export class UserRepository implements IUserRepository {
  async login(): Promise<any> {
    await Promise.resolve('login');
  }

  async signUp(): Promise<any> {
    await Promise.resolve('signUp');
  }
}
