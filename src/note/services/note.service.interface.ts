import { createNoteDto } from '../dto/create.note.dto';
import { createNoteResponse } from '../responses/note.response';

export interface INoteService {
  create(
    createNoteDto: createNoteDto,
    userId: number,
  ): Promise<createNoteResponse>;
}
