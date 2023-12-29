/*
  Warnings:

  - You are about to drop the column `is_used` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `total_like` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "is_used",
DROP COLUMN "total_like";
