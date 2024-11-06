/*
  Warnings:

  - You are about to drop the column `checkin_id` on the `records` table. All the data in the column will be lost.
  - Added the required column `checkin_session_id` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "records" DROP CONSTRAINT "records_checkin_id_fkey";

-- AlterTable
ALTER TABLE "records" DROP COLUMN "checkin_id",
ADD COLUMN     "checkin_session_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "checkin_sessions" (
    "id" TEXT NOT NULL,
    "checkin_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkin_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checkin_sessions" ADD CONSTRAINT "checkin_sessions_checkin_id_fkey" FOREIGN KEY ("checkin_id") REFERENCES "checkins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_checkin_session_id_fkey" FOREIGN KEY ("checkin_session_id") REFERENCES "checkin_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
