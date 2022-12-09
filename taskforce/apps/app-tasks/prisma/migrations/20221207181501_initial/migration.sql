-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Cancelled', 'AtWork', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" TEXT,
    "deadline" TEXT,
    "image" TEXT,
    "address" TEXT,
    "tegs" TEXT[],
    "status" "TaskStatus" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
