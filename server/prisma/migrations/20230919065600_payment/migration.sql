-- CreateTable
CREATE TABLE "Payment" (
    "order_id" TEXT NOT NULL,
    "session_id" TEXT,
    "booking_id" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("order_id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;
