import { Module } from '@nestjs/common';
import { UserController } from './controller/auth.controller';
import { NoteModule } from 'src/note/note.module';

@Module({
  imports: [NoteModule],
  controllers: [UserController],
})
export class UsersModule {}
