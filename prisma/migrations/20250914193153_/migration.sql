/*
  Warnings:

  - You are about to drop the column `stats_id` on the `monsters` table. All the data in the column will be lost.
  - You are about to drop the `stats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "monsters" DROP CONSTRAINT "monsters_stats_id_fkey";

-- AlterTable
ALTER TABLE "monsters" DROP COLUMN "stats_id",
ADD COLUMN     "attack" INTEGER,
ADD COLUMN     "defense" INTEGER,
ADD COLUMN     "hp" INTEGER,
ADD COLUMN     "special_attack" INTEGER,
ADD COLUMN     "special_defense" INTEGER,
ADD COLUMN     "speed" INTEGER;

-- DropTable
DROP TABLE "stats";
