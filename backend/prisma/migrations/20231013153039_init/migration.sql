/*
  Warnings:

  - You are about to drop the column `programmeData` on the `Programme` table. All the data in the column will be lost.
  - Added the required column `description` to the `Programme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Programme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Programme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Programme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainer` to the `Programme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Programme" DROP COLUMN "programmeData",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" DATE NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL,
ADD COLUMN     "trainer" TEXT NOT NULL;
