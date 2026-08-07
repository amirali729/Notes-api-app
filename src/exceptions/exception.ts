import { HttpException, HttpStatus } from '@nestjs/common';

export class Infrastructure extends HttpException {
  constructor() {
    super('Infrastructure', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
