export interface NoteEntity {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date | null;
  deletedAt?: Date | null;
  isDeleted: boolean;
}
