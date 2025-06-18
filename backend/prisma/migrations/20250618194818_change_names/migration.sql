/*
  Warnings:

  - You are about to drop the column `gif` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Card` table. All the data in the column will be lost.
  - Added the required column `cardDescription` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardTitle` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardUpvotes` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gifURL` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "gif",
DROP COLUMN "message",
DROP COLUMN "upvotes",
ADD COLUMN     "cardDescription" TEXT NOT NULL,
ADD COLUMN     "cardTitle" TEXT NOT NULL,
ADD COLUMN     "cardUpvotes" INTEGER NOT NULL,
ADD COLUMN     "gifURL" TEXT NOT NULL;
