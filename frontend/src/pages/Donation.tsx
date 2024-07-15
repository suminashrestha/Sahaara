import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import LandingNav from "../components/LandingNav";
import Button from "../components/Button";
import { donationSchema, donationType } from "../validators/donationValidators";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_SECRET);

const Donation: React.FC = () => {
  const [amount, setAmount] = useState<donationType>(1);

  const handleSubmit = async (event: React.FormEvent) => {
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

    const confirmed = confirm(`Are you sure you want to donate $${amount} ?`);
    if (!confirmed) {
      return;
    }

    const response = await fetch(
      "http://localhost:8080/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      }
    );

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
      <div className="max-w-screen my-8 p-8 flex flex-col md:flex-row h-[80vh] justify-center items-center gap-8 md:gap-4">
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
        <form onSubmit={handleSubmit} className="md:w-1/4 w-full">
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount in USD:
            </label>
            <input
              id="amount"
              type="number"
              value={amount ?? ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
            />
          </div>
          <Button type="submit" className="w-full">
            Donate
          </Button>
        </form>
      </div>
    </>
  );
};

export default Donation;
