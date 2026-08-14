import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

type JwtData = {
  userId: number;
  username: string;
  email: string;
};

@Injectable()
export class JwtService {
  createAccessToken(data: JwtData) {
    const secret = process.env.ACCESS_SCERET_TOKEN;
    if (!secret) {
      throw new Error('JWT secret not configured');
    }
    return jwt.sign(data, secret as jwt.Secret, {
      expiresIn: process.env
        .ACCESS_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'],
    });
  }

  createRefreshToken(data: JwtData) {
    const secret = process.env.REFRESH_SCERET_TOKEN;
    if (!secret) {
      throw new Error('JWT secret not configured');
    }
    return jwt.sign(data, secret as jwt.Secret, {
      expiresIn: process.env
        .REFRESH_TOKEN_EXPIRY as jwt.SignOptions['expiresIn'],
    });
  }

  verifyAccessToken(token: string) {
    try {
      const secret = process.env.ACCESS_SCERET_TOKEN as jwt.Secret;
      const payload = jwt.verify(token, secret);
      return payload;
    } catch {
      throw new InternalServerErrorException();
    }
  }
  verifyRefreshToken(token: string) {
    try {
      const secret = process.env.REFRESH_SCERET_TOKEN as jwt.Secret;
      const payload = jwt.verify(token, secret);
      return payload;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
