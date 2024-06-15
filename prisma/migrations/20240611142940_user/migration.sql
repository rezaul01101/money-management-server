/*
  Warnings:

  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `transactions` MODIFY `amount` BIGINT NOT NULL,
    MODIFY `remarks` VARCHAR(191) NULL;
