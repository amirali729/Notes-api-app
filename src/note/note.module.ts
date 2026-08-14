import { Module } from '@nestjs/common';
import { NoteController } from './controller/note.controller';
import { PrismaService } from 'src/db/prisma';
import { JwtService } from 'src/services/jwt.service';
import { NoteRespository } from './repository/note.repository.impl';
import { NoteService } from './services/note.services.impl';

@Module({
  controllers: [NoteController],
  providers: [JwtService, PrismaService, NoteRespository, NoteService],
})
export class NoteModule {}
