import { createNoteDto, deleteNoteDto } from '../dto/note.dto';
import { NoteEntity } from '../model/note.entity';
import {
  createNoteResponse,
  singleNoteResponse,
} from '../responses/note.response';

export interface INoteService {
  create(
    createNoteDto: createNoteDto,
    userId: number,
  ): Promise<createNoteResponse>;
  delete(deleteNoteDto: deleteNoteDto, userId: number): Promise<NoteEntity>;
  findNoteBytitle(
    deleteNote: deleteNoteDto,
    userId: number,
  ): Promise<singleNoteResponse>;
  findAllNotesByUserId(userId: number): Promise<NoteEntity[]>;
  updateNote(noteId: number, title: string): Promise<NoteEntity>;
}
