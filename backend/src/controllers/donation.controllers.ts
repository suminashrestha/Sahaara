import crypto from "crypto";
import { Request, Response } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const generateUUID = () => {
  return crypto.randomUUID();
};

const stripeController = async (req: Request, res: Response) => {
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
              description:
                "Thank You for helping us. We are very grateful for your support.",
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
};

const eSewaController = async (req: Request, res: Response) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const total_amount = parseFloat(amount) + 0;
  const product_code = process.env.ESEWA_PRODUCT_CODE as string;

  const transaction_uuid = generateUUID();

  const data = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

  const secretKey = process.env.ESEWA_SECRET_KEY as string;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(data)
    .digest("base64");

  const signedFieldNames = "total_amount,transaction_uuid,product_code";

  res.json({
    signature,
    total_amount,
    transaction_uuid,
    product_code,
    signedFieldNames,
  });
};
export { stripeController, eSewaController };
