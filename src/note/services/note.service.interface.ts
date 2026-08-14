import { createNoteDto } from '../dto/create.note.dto';

export interface INoteService {
  create(createNoteDto: createNoteDto, userId: number): Promise<any>;
}
