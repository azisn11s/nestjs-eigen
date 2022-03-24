-- CreateTable
CREATE TABLE "book_member" (
    "bookId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "book_member_pkey" PRIMARY KEY ("bookId","memberId")
);

-- AddForeignKey
ALTER TABLE "book_member" ADD CONSTRAINT "book_member_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_member" ADD CONSTRAINT "book_member_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
