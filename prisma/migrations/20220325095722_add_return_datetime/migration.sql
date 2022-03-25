-- AlterTable
ALTER TABLE "book_member" ADD COLUMN     "returnedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "isOnPenalty" BOOLEAN NOT NULL DEFAULT false;
