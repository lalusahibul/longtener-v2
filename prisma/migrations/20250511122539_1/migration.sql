-- CreateTable
CREATE TABLE "Tautan" (
    "id" SERIAL NOT NULL,
    "link_asli" TEXT NOT NULL,
    "link_panjang" TEXT NOT NULL,

    CONSTRAINT "Tautan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tautan_link_panjang_key" ON "Tautan"("link_panjang");
