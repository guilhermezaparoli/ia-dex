/*
  Warnings:

  - You are about to drop the column `type_id` on the `monsters` table. All the data in the column will be lost.
  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Types" AS ENUM ('NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY');

-- DropForeignKey
ALTER TABLE "monsters" DROP CONSTRAINT "monsters_type_id_fkey";

-- DropIndex
DROP INDEX "monsters_user_id_type_id_idx";

-- AlterTable
ALTER TABLE "monsters" DROP COLUMN "type_id",
ADD COLUMN     "types" "Types"[] DEFAULT ARRAY[]::"Types"[];

-- DropTable
DROP TABLE "types";

-- CreateIndex
CREATE INDEX "monsters_user_id_idx" ON "monsters"("user_id");
