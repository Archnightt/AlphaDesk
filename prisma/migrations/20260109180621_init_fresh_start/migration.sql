-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('BULLISH', 'BEARISH', 'NEUTRAL');

-- CreateTable
CREATE TABLE "Stock" (
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "change" DOUBLE PRECISION NOT NULL,
    "sector" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "automated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("symbol")
);

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "changePercent" DOUBLE PRECISION NOT NULL,
    "narrative" TEXT NOT NULL,
    "sentiment" "Sentiment" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "Snapshot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
