/*
  Warnings:

  - Added the required column `deadline` to the `Gameweek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Entry` MODIFY `prediction` VARCHAR(1023) NOT NULL;

-- AlterTable
ALTER TABLE `Gameweek` ADD COLUMN `deadline` VARCHAR(191) NOT NULL;
