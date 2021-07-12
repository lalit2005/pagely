-- CreateTable
CREATE TABLE "notionSites" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "notionPageUrl" VARCHAR NOT NULL,
    "siteName" VARCHAR NOT NULL,
    "siteDesc" VARCHAR NOT NULL,
    "customCss" VARCHAR,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notionSites.notionPageUrl_unique" ON "notionSites"("notionPageUrl");
