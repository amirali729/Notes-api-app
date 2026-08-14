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
    const newNote = await this.prismaService.note.create({
      data: {
        title: note.title,
        description: note.description,
        createdBy: note.userId,
        UserId: note.userId,
      },
    });
    return newNote;
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
