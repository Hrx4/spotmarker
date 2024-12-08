/*
  Warnings:

  - Added the required column `image` to the `Notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
