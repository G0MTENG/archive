/*
  Warnings:

  - Added the required column `color` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Card` ADD COLUMN `color` VARCHAR(191) NOT NULL;
