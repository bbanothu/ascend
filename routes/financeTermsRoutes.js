const express = require('express');
const router = express.Router();
const {
  createFinanceTerms,
  agreeToTerms,
  listFinanceTerms,
} = require('../controllers/financeTermsController');

router.post('/', createFinanceTerms);
router.patch('/:id/agree', agreeToTerms);
router.get('/', listFinanceTerms);

module.exports = router;

