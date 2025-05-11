/*
  Warnings:

  - A unique constraint covering the columns `[link_panjang]` on the table `Tautan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tautan_link_panjang_key" ON "Tautan"("link_panjang");
