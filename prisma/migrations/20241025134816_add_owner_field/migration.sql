/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "owner_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "companies_owner_id_key" ON "companies"("owner_id");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
