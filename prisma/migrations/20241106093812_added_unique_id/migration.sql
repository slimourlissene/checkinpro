/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `checkin_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `checkins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `records` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "accounts_id_key" ON "accounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "checkin_sessions_id_key" ON "checkin_sessions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "checkins_id_key" ON "checkins"("id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_id_key" ON "companies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "records_id_key" ON "records"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_id_key" ON "sessions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
