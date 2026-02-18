-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'cancelled', 'expired');

-- CreateTable
CREATE TABLE "User" (
    "name" VARCHAR(30) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "name" VARCHAR(100) NOT NULL,
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "frequency" "Frequency" NOT NULL,
    "category" "Category" NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "renewalDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
