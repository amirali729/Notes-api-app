-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "createdBy" DROP DEFAULT,
ALTER COLUMN "createdBy" SET DATA TYPE TEXT;
DROP SEQUENCE "note_createdby_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdBy" DROP DEFAULT,
ALTER COLUMN "createdBy" SET DATA TYPE TEXT;
DROP SEQUENCE "user_createdby_seq";
