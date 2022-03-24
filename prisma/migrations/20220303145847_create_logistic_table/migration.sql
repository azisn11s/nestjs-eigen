-- CreateTable
CREATE TABLE "logistics" (
    "id" TEXT NOT NULL,
    "logistic_name" VARCHAR(100) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "destination_name" VARCHAR NOT NULL,
    "origin_name" VARCHAR NOT NULL,
    "duration" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logistics_pkey" PRIMARY KEY ("id")
);
