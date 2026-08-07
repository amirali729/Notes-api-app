// "id" SERIAL NOT NULL,
//     "username" TEXT NOT NULL,
//     "password" TEXT NOT NULL,
//     "email" TEXT NOT NULL,
//     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     "createdBy" INTEGER NOT NULL,
//     "updatedAt" TIMESTAMP(3) NOT NULL,
//     "deletedAt" TIMESTAMP(3),
//     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
export interface UserEntity {
  id: number;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  deletedAt?: Date | null;
  isDeleted: boolean;
}
