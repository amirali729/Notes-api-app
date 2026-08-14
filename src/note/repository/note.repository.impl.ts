import { Injectable } from '@nestjs/common';
import {
  createdNotetypes,
  INoteRespository,
} from './note.repository.interface';
import { NoteEntity } from '../model/note.entity';
import { PrismaService } from 'src/db/prisma';
import { Infrastructure } from 'src/exceptions/exception';

type NoteRecord = {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: number | string;
  updatedAt: Date | null;
  deletedAt: Date | null;
  isDeleted: boolean;
};

@Injectable()
export class NoteRespository implements INoteRespository {
  constructor(private readonly prismaService: PrismaService) {}

  private mapToNoteEntity(note: NoteRecord): NoteEntity {
    return {
      id: note.id,
      title: note.title,
      description: note.description,
      createdAt: note.createdAt,
      createdBy: Number(note.createdBy),
      updatedAt: note.updatedAt ?? null,
      deletedAt: note.deletedAt ?? null,
      isDeleted: note.isDeleted,
    };
  }

  async createNotes(note: createdNotetypes): Promise<NoteEntity | null> {
    try {
      const newNote = await this.prismaService.note.create({
        data: {
          title: note.title,
          description: note.description,
          createdBy: note.userId,
          UserId: note.userId,
        },
      });
      return this.mapToNoteEntity(newNote);
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
      return note ? this.mapToNoteEntity(note) : null;
    } catch {
      throw new Infrastructure();
    }
  }
}
