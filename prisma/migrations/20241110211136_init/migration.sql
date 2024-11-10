-- CreateTable
CREATE TABLE "InsurancePolicy" (
    "id" SERIAL NOT NULL,
    "premium" DOUBLE PRECISION NOT NULL,
    "taxFee" DOUBLE PRECISION NOT NULL,
    "insuredName" TEXT NOT NULL,
    "financeTermsId" INTEGER,

    CONSTRAINT "InsurancePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceTerms" (
    "id" SERIAL NOT NULL,
    "downpayment" DOUBLE PRECISION NOT NULL,
    "amountFinanced" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'non-agreed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceTerms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InsurancePolicy" ADD CONSTRAINT "InsurancePolicy_financeTermsId_fkey" FOREIGN KEY ("financeTermsId") REFERENCES "FinanceTerms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
