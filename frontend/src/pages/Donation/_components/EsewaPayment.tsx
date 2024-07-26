import React, { useState } from "react";
import API from "../../../config/baseUrl";
import Button from "../../../components/Button";

const EsewaPayment: React.FC<{ amount: number }> = ({ amount }) => {
  const [signature, setSignature] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/v1/donate/eSewa", {
        amount,
      });

      const {
        signature,
        total_amount,
        transaction_uuid,
        product_code,
        signedFieldNames,
      } = response.data;
      setSignature(signature);

      // Redirect to eSewa form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      form.appendChild(createHiddenInput("amount", amount));
      form.appendChild(createHiddenInput("tax_amount", "0"));
      form.appendChild(createHiddenInput("total_amount", total_amount));
      form.appendChild(createHiddenInput("transaction_uuid", transaction_uuid));
      form.appendChild(createHiddenInput("product_code", product_code));
      form.appendChild(createHiddenInput("product_service_charge", "0"));
      form.appendChild(createHiddenInput("product_delivery_charge", "0"));
      form.appendChild(
        createHiddenInput("success_url", "http://localhost:5173/success")
      );
      form.appendChild(
        createHiddenInput("failure_url", "http://localhost:5173/cancel")
      );
      form.appendChild(
        createHiddenInput("signed_field_names", signedFieldNames)
      );
      form.appendChild(createHiddenInput("signature", signature));

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error creating signature:", error);
    }
  };

  const createHiddenInput = (name: string, value: any) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    return input;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-300"
        >
          Donate
        </Button>
      </form>
    </>
  );
};

export default EsewaPayment;