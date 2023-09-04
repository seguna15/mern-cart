const Stripe = require('stripe');
const createOrder = require('../orders/orders.service');
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

//payment processing controller method
const stripePayment =   async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems),
    },
  });
  const line_items = req.body.cartItems.map(item => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            id: item.id
          }
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  })
  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "NG"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({url: session.url});
}

//webhook for registering order when payment is completed
const stripeWebhook = async (req, res) => {
  let data;
  let eventType;

  // Check if webhook signing is configured.
  let webhookSecret;

  webhookSecret = process.env.WEBHOOK_SECRET;
  
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data.object;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the checkout.session.completed event
  if (eventType === "checkout.session.completed") {
    try {
      const customer = await stripe.customers.retrieve(data.customer);
      createOrder(customer, data);
    } catch (error) {
      console.log(typeof createOrder);
      console.log(error.message);
    }
  }

  res.status(200).end();
};



module.exports = {
  stripePayment,
  stripeWebhook,
};