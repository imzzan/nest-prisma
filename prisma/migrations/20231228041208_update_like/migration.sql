/*
  Warnings:

  - You are about to drop the column `total_like` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "total_like";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "total_like" INTEGER NOT NULL DEFAULT 0;
