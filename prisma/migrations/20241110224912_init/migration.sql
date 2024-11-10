/*
  Warnings:

  - Added the required column `downpayment` to the `InsurancePolicy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InsurancePolicy" ADD COLUMN     "downpayment" DOUBLE PRECISION NOT NULL;
