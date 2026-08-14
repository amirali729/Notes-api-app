import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NoteRespository } from '../repository/note.repository.impl';
import { INoteService } from './note.service.interface';
import { createNoteDto } from '../dto/create.note.dto';
import { createNoteResponse } from '../responses/note.response';

@Injectable()
export class NoteService implements INoteService {
  constructor(private readonly NotesRepository: NoteRespository) {}

  async create(
    createNoteDto: createNoteDto,
    userId: number,
  ): Promise<createNoteResponse> {
    const notefound = await this.NotesRepository.findNotesByTitle(
      createNoteDto.title,
    );
    if (!notefound) {
      throw new ConflictException('title with this note is already exist');
    }

    const note = {
      ...createNoteDto,
      userId,
    };

    const createdNote = await this.NotesRepository.createNotes(note);
    if (!createdNote) {
      throw new InternalServerErrorException('note creation failed');
    }
    return {
      title: createdNote.title,
      description: createdNote.description,
      createdBy: createdNote.createdBy,
    };
  }
}
