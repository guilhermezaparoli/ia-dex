/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `monsters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "monsters_name_key" ON "monsters"("name");
