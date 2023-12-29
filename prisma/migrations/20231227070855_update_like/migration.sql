-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "total_post" SET DEFAULT 0;
