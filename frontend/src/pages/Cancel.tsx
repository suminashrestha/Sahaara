import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { FaArrowRotateRight } from "react-icons/fa6";

const Cancel: React.FC = () => {
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
        <span className="text-red-600">ERRORRRR !!!!!!!!!</span> cancelled due
        to some reasons
      </p>
      <div>You will be redirected to homepage in {time} seconds</div>
      <div className="flex flex-col space-y-1">
        <div>Want to Try Again ???</div>
        <Button
          type="submit"
          className="w-full py-1 rounded-md"
          onClick={() => {
            navigate("/donate", { replace: true });
          }}
        >
          Try Again <FaArrowRotateRight size={14} className="inline" />
        </Button>
      </div>
    </div>
  );
};

export default Cancel;
