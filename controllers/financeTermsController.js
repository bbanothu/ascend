const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createFinanceTerms = async (req, res) => {
  try {
    const { dueDate, policies } = req.body;

    let totalPremium = 0;
    let totalTaxFee = 0;
    const policiesData = policies.map((policy) => {
      const downpayment = policy.premium * 0.2 + policy.taxFee;
      totalPremium += policy.premium;
      totalTaxFee += policy.taxFee;
      return { ...policy, downpayment };
    });
    const totalDownpayment = totalPremium * 0.2 + totalTaxFee;
    const amountFinanced = totalPremium + totalTaxFee - totalDownpayment;

    const financeTerms = await prisma.financeTerms.create({
      data: {
        dueDate: new Date(dueDate),
        downpayment: 0.00,
        amountFinanced,
        policies: { create: policiesData },
      },
    });

    res.status(201).json(financeTerms);
  } catch (error) {
    res.status(400).json({ error: "Creating failed" });
  }
};


const agreeToTerms = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFinanceTerms = await prisma.financeTerms.update({
      where: { id: parseInt(id, 10) },
      data: { status: 'agreed' },
    });
    res.status(200).json(updatedFinanceTerms);
  } catch (error) {
    res.status(400).json({ error: 'Agreeing Failed' });
  }
};

const listFinanceTerms = async (req, res) => {
  const { downpayment, status, sortBy, order = 'asc' } = req.query;
  const filters = {};

  if (downpayment) {
    filters.downpayment = { equals: parseFloat(downpayment) };
  }
  if (status) {
    filters.status = status;
  }

  try {
    const financeTerms = await prisma.financeTerms.findMany({
      where: filters,
      orderBy: { [sortBy]: order === 'desc' ? 'desc' : 'asc' },
      include: { policies: true },
    });
    res.status(200).json(financeTerms);
  } catch (error) {
    res.status(400).json({ error: 'Fetching Failed' });
  }
};

module.exports = {
  createFinanceTerms,
  agreeToTerms,
  listFinanceTerms,
};
