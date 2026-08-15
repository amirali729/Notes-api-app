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

  async findNoteByTitle(
    title: string,
    userId: number,
  ): Promise<NoteEntity | null> {
    try {
      const note = await this.prismaService.note.findFirst({
        where: {
          title: title,
          isDeleted: false,
          createdBy: userId,
        },
      });
      return note;
    } catch {
      throw new Infrastructure();
    }
  }

  async deleteNoteBytitle(title: string): Promise<NoteEntity | null> {
    try {
      const deletedNoteAt = new Date();
      const deletedNote = await this.prismaService.note.update({
        where: {
          title: title,
        },
        data: {
          deletedAt: deletedNoteAt,
          isDeleted: true,
        },
      });
      return deletedNote;
    } catch {
      throw new Infrastructure();
    }
  }

  async findAllNotesByUser(userId: number): Promise<NoteEntity[]> {
    try {
      const userAllNotes = await this.prismaService.note.findMany({
        where: {
          UserId: userId,
          isDeleted: false,
        },
      });
      return userAllNotes;
    } catch {
      throw new Infrastructure();
    }
  }

  async updateNoteTitle(title: string, noteId: number): Promise<NoteEntity> {
    const updatedNoteAt = new Date();
    const updatedNote = await this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: title,
        updatedAt: updatedNoteAt,
      },
    });

    return updatedNote;
  }
}
