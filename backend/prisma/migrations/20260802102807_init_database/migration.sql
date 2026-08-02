/*
  Warnings:

  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `bookingDate` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guideId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `touristId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_guideId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userId",
ADD COLUMN     "guideId" TEXT NOT NULL,
ADD COLUMN     "touristId" TEXT NOT NULL,
ALTER COLUMN "comment" SET NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "Payment"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
