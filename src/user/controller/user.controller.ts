import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('register')
  SignUp() {}

  @Get('login')
  Login() {}

  @Get(':id')
  GetUser() {}

  @Post('logout')
  Logout() {}
}
