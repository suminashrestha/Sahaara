import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { RiBearSmileLine } from "react-icons/ri";

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(7);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (time < 0) {
      navigate("/", { replace: true });
    }
  }, [time, navigate]);

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-5">
      <p>
        <span className="text-green-600">SUCCESS !!!!!!!!!</span> Your donation
        has been processed successfully.
      </p>
      <div>You will be redirected to homepage in {time} seconds</div>
      <div className="flex flex-col space-y-1">
        <div>Want to Donate Again ???</div>
        <Button
          type="submit"
          className="w-full py-1 rounded-md"
          onClick={() => {
            navigate("/donate", { replace: true });
          }}
        >
          Donate Again <RiBearSmileLine size={14} className="inline" />
        </Button>
      </div>
    </div>
  );
};

export default Success;
