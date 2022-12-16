/*
  Warnings:

  - You are about to drop the column `tegs` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tegs",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
