-- CreateTable
CREATE TABLE "ListString" (
    "id" TEXT NOT NULL,
    "list" TEXT[],

    CONSTRAINT "ListString_pkey" PRIMARY KEY ("id")
);
