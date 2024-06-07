/*
  Warnings:

  - Added the required column `loggableType` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `log` ADD COLUMN `loggableType` VARCHAR(191) NOT NULL;
