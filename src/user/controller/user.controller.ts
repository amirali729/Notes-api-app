import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service.impl';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async SignUp(@Body() signupData: SignUpUserDto) {
    try {
      return await this.userService.signup(signupData);
    } 
}


  @Get('login')
  Login() {}

  @Get(':id')
  GetUser() {}

  @Post('logout')
  Logout() {}
}
