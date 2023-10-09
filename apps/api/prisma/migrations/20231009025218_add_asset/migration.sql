-- CreateTable
CREATE TABLE "Asset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastPriceUsd" DECIMAL NOT NULL,
    "lastPriceChange" DATETIME NOT NULL,
    "coincapId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_slug_key" ON "Asset"("slug");
