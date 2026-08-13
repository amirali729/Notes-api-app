import { Injectable } from '@nestjs/common';
import {
  createdNotetypes,
  INoteRespository,
} from './note.repository.interface';
import { NoteEntity } from '../model/note.entity';
import { PrismaService } from 'src/db/prisma';
import { Infrastructure } from 'src/exceptions/exception';

@Injectable()
export class NoteRespository implements INoteRespository {
  constructor(private readonly prismaService: PrismaService) {}
  async createNotes(note: createdNotetypes): Promise<NoteEntity | null> {
    try {
      const newNote = await this.prismaService.note.create({
        data: {
          title: note.title,
          description: note.description,
          createdBy: note.createdBy,
          UserId: note.userId,
        },
      });
      return newNote;
    } catch {
      throw new Infrastructure();
    }
  }

  async findNotesByTitle(title: string): Promise<NoteEntity | null> {
    try {
      const note = await this.prismaService.note.findFirst({
        where: {
          title: title,
        },
      });
      return note;
    } catch {
      throw new Infrastructure();
    }
  }
}
