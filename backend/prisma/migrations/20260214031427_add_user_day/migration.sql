/*
  Warnings:

  - You are about to drop the column `isUnlocked` on the `land` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `monthlyprogressdisplay` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `monthlyprogressdisplay` table. All the data in the column will be lost.
  - You are about to drop the column `isUnlocked` on the `spot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,spotId]` on the table `MonthlyProgressDisplay` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Land` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotId` to the `MonthlyProgressDisplay` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `habit` DROP FOREIGN KEY `FK_Habit_User`;

-- AlterTable
ALTER TABLE `land` DROP COLUMN `isUnlocked`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `monthlyprogressdisplay` DROP COLUMN `createdAt`,
    DROP COLUMN `month`,
    ADD COLUMN `progressPercentage` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `spotId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `spot` DROP COLUMN `isUnlocked`;

-- CreateTable
CREATE TABLE `UserDay` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `dayId` INTEGER NOT NULL,
    `unlocked` BOOLEAN NOT NULL DEFAULT false,
    `completed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `UserDay_userId_dayId_key`(`userId`, `dayId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `landId` INTEGER NOT NULL,
    `unlocked` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `UserLand_userId_landId_key`(`userId`, `landId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSpot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `spotId` INTEGER NOT NULL,
    `unlocked` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `UserSpot_userId_spotId_key`(`userId`, `spotId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `MonthlyProgressDisplay_userId_spotId_key` ON `MonthlyProgressDisplay`(`userId`, `spotId`);

-- AddForeignKey
ALTER TABLE `UserDay` ADD CONSTRAINT `UserDay_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDay` ADD CONSTRAINT `UserDay_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `Day`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonthlyProgressDisplay` ADD CONSTRAINT `MonthlyProgressDisplay_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Spot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Habit` ADD CONSTRAINT `Habit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLand` ADD CONSTRAINT `UserLand_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLand` ADD CONSTRAINT `UserLand_landId_fkey` FOREIGN KEY (`landId`) REFERENCES `Land`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSpot` ADD CONSTRAINT `UserSpot_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSpot` ADD CONSTRAINT `UserSpot_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Spot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
