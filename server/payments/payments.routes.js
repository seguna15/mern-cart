const express = require('express');
const { stripePayment, stripeWebhook } = require('./payment.controller');
const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router
.post('/create-checkout-session', stripePayment)
.post('/webhook',stripeWebhook);

module.exports = router