const express = require('express');
const financeTermsRoutes = require('./routes/financeTermsRoutes');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/finance-terms', financeTermsRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
