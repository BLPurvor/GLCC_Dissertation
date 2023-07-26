-- AlterTable
ALTER TABLE `Entry` MODIFY `datetime` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Wallet` ALTER COLUMN `cash_value` DROP DEFAULT;
