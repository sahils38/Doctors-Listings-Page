/*
  Warnings:

  - Added the required column `imageUrl` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "modeOfConsult" TEXT[];
