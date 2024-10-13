/*
  Warnings:

  - You are about to drop the column `firstConnection` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstConnection",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
