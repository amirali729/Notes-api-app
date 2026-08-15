import { createNoteDto, deleteNoteDto } from '../dto/create.note.dto';
import { NoteEntity } from '../model/note.entity';
import { createNoteResponse } from '../responses/note.response';

export interface INoteService {
  create(
    createNoteDto: createNoteDto,
    userId: number,
  ): Promise<createNoteResponse>;
  delete(deleteNoteDto: deleteNoteDto, userId: number): Promise<NoteEntity>;
  findNoteBytitle(deleteNote: deleteNoteDto, userId: number): Promise<any>;
  findAllNotesByUserId(userId: number): Promise<any>;
}
