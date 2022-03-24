/*
  Warnings:

  - You are about to drop the column `amount` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `joinDate` on the `members` table. All the data in the column will be lost.
  - Added the required column `code` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "amount",
ADD COLUMN     "code" CHAR(30) NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "members" DROP COLUMN "full_name",
DROP COLUMN "joinDate",
ADD COLUMN     "code" CHAR(30) NOT NULL,
ADD COLUMN     "name" VARCHAR(200) NOT NULL;
