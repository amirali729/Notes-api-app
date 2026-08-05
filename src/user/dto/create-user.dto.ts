import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'username must be at least 3 characters long' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password: string;
}
