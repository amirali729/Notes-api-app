import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  SignUpUserDto,
  loginUserDto,
  passwordChangedDto,
} from '../dto/user.dto';
import { UserService } from '../services/user.service.impl';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('users')
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

  // @Param() params: any): string
  @UseGuards(AuthGuard)
  @Post('/:id/changedPassword')
  Logout(
    @Param() params: { id: string },
    @Body() passwordDto: passwordChangedDto,
  ) {
    const { oldPassword, newPassword } = passwordDto;
    const id = Number(params.id);
    console.log(id);
    return this.userService.changedUserPassword(id, oldPassword, newPassword);
  }
}
