export interface NoteEntity {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date | null;
  deletedAt?: Date | null;
  isDeleted: boolean;
}
