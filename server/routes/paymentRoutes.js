const express = require('express');
const router = express.Router();
const { createOrder, savePayment } = require('../controllers/paymentController');

router.post('/create-order', createOrder);
router.post('/save-payment', savePayment);

module.exports = router;