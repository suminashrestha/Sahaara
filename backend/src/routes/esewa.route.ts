import express from "express";
import axios from "axios";

const router = express.Router();

const ESEWA_MERCHANT_ID = "your_esewa_merchant_id";
const ESEWA_SECRET_KEY = "your_esewa_secret_key";

router.route("/").post(async (req, res) => {
  const { amount } = req.body;

  const paymentData = {
    amt: amount,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: amount,
    pid: `pid-${Date.now()}`,
    scd: ESEWA_MERCHANT_ID,
    su: "http://localhost:5173/success",
    fu: "http://localhost:5173/failure",
  };

  try {
    const response = await axios.post(
      "https://esewa.com.np/epay/main",
      paymentData
    );
    res.json({ redirectUrl: response.data.redirectUrl });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

export { router as esewaRoute };
