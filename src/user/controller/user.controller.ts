import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SignUpUserDto, loginUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service.impl';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async SignUp(@Body() signupData: SignUpUserDto) {
    return this.userService.signUp(signupData);
  }

  @Get('login')
  Login(@Body() loginData: loginUserDto) {
    return this.userService.login(loginData);
  }

  @Get(':id')
  GetUser() {}

  @Post('logout')
  Logout() {}
}
