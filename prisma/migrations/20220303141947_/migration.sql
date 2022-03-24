/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[msisdn]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `msisdn` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
ADD COLUMN     "msisdn" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "address";

-- CreateIndex
CREATE UNIQUE INDEX "users_msisdn_key" ON "users"("msisdn");
