export interface createNoteResponse {
  title: string;
  description: string;
  createdBy: number;
}

export interface singleNoteResponse {
  noteId: number;
  title: string;
  description: string;
}
