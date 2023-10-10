-- CreateTable
CREATE TABLE "PricePrediction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "assetId" INTEGER NOT NULL,
    "predictionType" TEXT NOT NULL,
    "initialPriceUsd" DECIMAL NOT NULL,
    "predictionTime" DATETIME NOT NULL,
    "finalPriceUsd" DECIMAL,
    "predictionResolveTime" DATETIME,
    "scoreChange" INTEGER,
    CONSTRAINT "PricePrediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PricePrediction_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
