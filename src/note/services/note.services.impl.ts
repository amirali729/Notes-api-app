import { Injectable } from '@nestjs/common';
import type { INoteRespository } from '../repository/note.repository.interface';
import { INoteService } from './note.service.interface';
import { createNoteDto } from '../dto/create.note.dto';

@Injectable()
export class NoteService implements INoteService {
  constructor(private readonly NotesRepository: INoteRespository) {}

  async create(createNoteDto: createNoteDto): Promise<any> {
    await this.NotesRepository.createNotes(createNoteDto);
  }
}
