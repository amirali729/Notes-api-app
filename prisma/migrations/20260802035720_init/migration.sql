-- AlterTable
CREATE SEQUENCE note_createdby_seq;
ALTER TABLE "Note" ALTER COLUMN "createdBy" SET DEFAULT nextval('note_createdby_seq');
ALTER SEQUENCE note_createdby_seq OWNED BY "Note"."createdBy";

-- AlterTable
CREATE SEQUENCE user_createdby_seq;
ALTER TABLE "User" ALTER COLUMN "createdBy" SET DEFAULT nextval('user_createdby_seq');
ALTER SEQUENCE user_createdby_seq OWNED BY "User"."createdBy";
