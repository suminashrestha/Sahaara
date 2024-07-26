import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { FaStripe } from "react-icons/fa";
import {
  donationSchema,
  donationType,
} from "../../validators/donationValidators";
import LandingNav from "../../components/LandingNav";
import StripePayment from "./_components/StripePayment";
import EsewaPayment from "./_components/EsewaPayment";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_SECRET);

type donation = "ESEWA" | "STRIPE";

const Donation: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<donation>("ESEWA");
  const [amount, setAmount] = useState<donationType>(1);

  const handleStripeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const stripe = await stripePromise;
    const validationResult = donationSchema.safeParse(amount);

    if (!validationResult.success) {
      toast(validationResult.error.errors[0].message);
      return;
    }

    if (!stripe || !amount) {
      return;
    }

    const confirmed = confirm(`Are you sure you want to donate ${amount} ?`);
    if (!confirmed) {
      return;
    }

    const response = await fetch("http://localhost:8080/api/v1/donate/stipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };
  return (
    <>
      <LandingNav />
      <div className="max-w-screen my-8 p-8 flex flex-col h-[80vh] justify-center items-center gap-8 md:gap-4 mt-20">
        <div className="md:w-1/2 w-full">
          <p>
            We're on a mission to rescue and find loving homes for animals in
            need. Our platform connects kind-hearted people with animals looking
            for a forever home. We've built this with love, and now we need your
            help to grow. If you're passionate about animals and want to make a
            real impact, join us as a volunteer. Together, we can give these
            animals the happy lives they deserve!
          </p>
        </div>
        <div className="">
          <div className="flex flex-col justify-around h-24 items-center">
            <p className="font-medium">Choose Donation Method</p>
            <div className="flex justify-center w-64">
              <div
                className="bg-zinc-100 font-bold text-green-500 flex items-center px-4 cursor-pointer border-slate-950 border-r-0 border-2 rounded-l-md"
                onClick={() => setPaymentMethod("ESEWA")}
              >
                ESEWA
              </div>
              <div
                className="bg-zinc-100 px-4 cursor-pointer border-slate-950 border--0 border-2 rounded-r-md"
                onClick={() => setPaymentMethod("STRIPE")}
              >
                <FaStripe size={40} />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount in{" "}
              {paymentMethod === "ESEWA" ? "Rupees" : "STRIPE" ? "USD" : ""}
            </label>
            <input
              id="amount"
              type="number"
              value={amount ?? ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
            />
          </div>
          {paymentMethod === "STRIPE" ? (
            <StripePayment handleSubmit={handleStripeSubmit} />
          ) : paymentMethod === "ESEWA" ? (
            <EsewaPayment amount={amount} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Donation;