/*
  Warnings:

  - You are about to drop the column `gameweekId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `Gameweek` table. All the data in the column will be lost.
  - You are about to drop the column `didPayout` on the `Gameweek` table. All the data in the column will be lost.
  - You are about to drop the column `walletId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cashValue` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `gameweek_id` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_name` to the `Gameweek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cash_value` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_gameweekId_fkey`;

-- DropForeignKey
ALTER TABLE `Gameweek` DROP FOREIGN KEY `Gameweek_authorName_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_walletId_fkey`;

-- AlterTable
ALTER TABLE `Entry` DROP COLUMN `gameweekId`,
    ADD COLUMN `gameweek_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Gameweek` DROP COLUMN `authorName`,
    DROP COLUMN `didPayout`,
    ADD COLUMN `author_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `did_payout` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `walletId`,
    ADD COLUMN `wallet_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    ADD COLUMN `first_name` VARCHAR(191) NULL,
    ADD COLUMN `last_name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Wallet` DROP COLUMN `cashValue`,
    ADD COLUMN `cash_value` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `Gameweek` ADD CONSTRAINT `Gameweek_author_name_fkey` FOREIGN KEY (`author_name`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_gameweek_id_fkey` FOREIGN KEY (`gameweek_id`) REFERENCES `Gameweek`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_wallet_id_fkey` FOREIGN KEY (`wallet_id`) REFERENCES `Wallet`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
