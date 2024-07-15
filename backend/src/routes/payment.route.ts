import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51PZTEMAdU86idx9wrKxEAzs7jIOHeq0jSqSGmLuID9cc4pi76XK4T9cIsx22wRNTKTjbCzvXzccTAZvWQvZnqygZ00k9CzR6Hc"
);

import express from "express";

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation",
            },
            unit_amount: amount * 100, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

export { router as stripeRoute };
