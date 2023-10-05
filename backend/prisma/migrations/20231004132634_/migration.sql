/*
  Warnings:

  - You are about to drop the column `data` on the `Programme` table. All the data in the column will be lost.
  - Added the required column `programmeData` to the `Programme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programme" DROP COLUMN "data",
ADD COLUMN     "programmeData" JSONB NOT NULL;
