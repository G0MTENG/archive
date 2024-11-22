/*
  Warnings:

  - You are about to drop the column `statusId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Card` DROP FOREIGN KEY `Card_statusId_fkey`;

-- AlterTable
ALTER TABLE `Card` DROP COLUMN `statusId`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Status`;
