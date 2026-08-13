import { NoteEntity } from '../model/note.entity';

export type createdNotetypes = {
  userId: number;
  title: string;
  description: string;
  createdBy: string;
};

export interface INoteRespository {
  findNotesByTitle(title: string): Promise<NoteEntity | null>;
  createNotes(note: createdNotetypes): Promise<NoteEntity | null>;
}
