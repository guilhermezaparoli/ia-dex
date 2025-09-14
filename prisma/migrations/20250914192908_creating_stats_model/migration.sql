-- AlterTable
ALTER TABLE "monsters" ADD COLUMN     "stats_id" INTEGER,
ALTER COLUMN "story" DROP NOT NULL;

-- CreateTable
CREATE TABLE "stats" (
    "id" SERIAL NOT NULL,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "special_attack" INTEGER NOT NULL,
    "special_defense" INTEGER NOT NULL,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "monsters" ADD CONSTRAINT "monsters_stats_id_fkey" FOREIGN KEY ("stats_id") REFERENCES "stats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
