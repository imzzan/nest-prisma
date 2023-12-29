/*
  Warnings:

  - You are about to drop the column `like` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `total_like` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "like",
ADD COLUMN     "total_like" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "total_like";
