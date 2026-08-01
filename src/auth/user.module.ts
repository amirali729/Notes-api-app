import { Module } from '@nestjs/common';
import { UserController } from './controller/auth.controller';
import { NoteModule } from 'src/note/note.module';
import { UserService } from 'src/user/services/user.service.impl';

@Module({
  imports: [NoteModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
