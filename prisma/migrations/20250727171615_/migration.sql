/*
  Warnings:

  - You are about to drop the column `history` on the `monsters` table. All the data in the column will be lost.
  - Added the required column `story` to the `monsters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monsters" DROP COLUMN "history",
ADD COLUMN     "story" TEXT NOT NULL;
