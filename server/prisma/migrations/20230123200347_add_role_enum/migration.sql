/*
  Warnings:

  - You are about to alter the column `gameweekId` on the `Entry` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Gameweek` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `_id` on the `Gameweek` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_gameweekId_fkey`;

-- AlterTable
ALTER TABLE `Entry` MODIFY `gameweekId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Gameweek` DROP PRIMARY KEY,
    MODIFY `_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`_id`);

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_gameweekId_fkey` FOREIGN KEY (`gameweekId`) REFERENCES `Gameweek`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
