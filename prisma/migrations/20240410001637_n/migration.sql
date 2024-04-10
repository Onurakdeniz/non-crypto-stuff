-- CreateTable
CREATE TABLE "User" (
    "fid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayname" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "following" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("fid")
);

-- CreateTable
CREATE TABLE "VerifiedAddress" (
    "userId" INTEGER NOT NULL,
    "ethAddresses" TEXT[],
    "solAddresses" TEXT[],

    CONSTRAINT "VerifiedAddress_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Section" (
    "value" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "UserSectionRead" (
    "fid" INTEGER NOT NULL,
    "sectionValue" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSectionRead_pkey" PRIMARY KEY ("fid","sectionValue")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "paragraphs" TEXT[],
    "image" TEXT NOT NULL,
    "sectionValue" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_fid_key" ON "User"("fid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "VerifiedAddress" ADD CONSTRAINT "VerifiedAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("fid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSectionRead" ADD CONSTRAINT "UserSectionRead_fid_fkey" FOREIGN KEY ("fid") REFERENCES "User"("fid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSectionRead" ADD CONSTRAINT "UserSectionRead_sectionValue_fkey" FOREIGN KEY ("sectionValue") REFERENCES "Section"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_sectionValue_fkey" FOREIGN KEY ("sectionValue") REFERENCES "Section"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
