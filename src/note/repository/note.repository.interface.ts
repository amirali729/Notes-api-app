import { NoteEntity } from '../model/note.entity';

export type createdNotetypes = {
  userId: number;
  title: string;
  description: string;
};

export interface INoteRespository {
  findNoteByTitle(title: string, userId: number): Promise<NoteEntity | null>;
  createNotes(note: createdNotetypes): Promise<NoteEntity | null>;
  deleteNoteBytitle(title: string): Promise<NoteEntity | null>;
  findAllNotesByUser(userId: number): Promise<NoteEntity[]>;
  updateNoteTitle(title: string, noteId: number): Promise<NoteEntity>;
}
