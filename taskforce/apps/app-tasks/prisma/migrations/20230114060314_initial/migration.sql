/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ADD COLUMN     "contractorId" TEXT,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "respondedUsers" TEXT[] DEFAULT ARRAY[]::TEXT[];
