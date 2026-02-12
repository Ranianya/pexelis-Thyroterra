/*
  Warnings:

  - You are about to drop the column `createdAt` on the `userprogress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,habitId,spotId,dayNumber]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayNumber` to the `UserProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `habitId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userprogress` DROP COLUMN `createdAt`,
    ADD COLUMN `dayNumber` INTEGER NOT NULL,
    ADD COLUMN `habitId` INTEGER NOT NULL,
    ADD COLUMN `spotId` INTEGER NOT NULL,
    MODIFY `status` ENUM('completed', 'missed') NOT NULL DEFAULT 'completed';

-- CreateTable
CREATE TABLE `HabitCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Habit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `taskName` VARCHAR(191) NOT NULL,
    `check` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `UserProgress_userId_habitId_spotId_dayNumber_key` ON `UserProgress`(`userId`, `habitId`, `spotId`, `dayNumber`);

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Spot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_habitId_fkey` FOREIGN KEY (`habitId`) REFERENCES `Habit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Habit` ADD CONSTRAINT `Habit_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `HabitCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
