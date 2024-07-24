import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../config/baseUrl";
import UserNav from "../components/UserNav";
import ErrorText from "../components/ErrorText";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useUser from "../hooks/useUser";

interface VolunteerPostSchema {
  title: string;
  location: string;
  date: string; // Changed to string for easier handling
  eventTime: string;
}

const CreateVolunteer = () => {
  const user = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerPostSchema>({
    defaultValues: {
      title: "",
      location: "",
      date: "",
      eventTime: "",
    },
  });

  useEffect(() => {
    if (user?.type !== "organization") {
      navigate("/profile/rescue", { replace: true });
    }
  }, [user, navigate]);

  const formSubmit = async (data: VolunteerPostSchema) => {
    try {
      const formData = {
        title: data.title,
        location: data.location,
        eventTime: data.eventTime,
        date: data.date ? new Date(data.date).toISOString() : null,
      };

      const response = await API.post("/api/v1/volunteer-posts", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) return;

      toast.success("Event Created  ");
      reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <UserNav />
      <div className="w-full h-[80vh] flex flex-col items-center justify-center p-6 mt-20">
        <div className="flex flex-col justify-center bg-red p-6 rounded shadow-lg md:w-1/3 ">
          <h1 className="text-3xl font-bold mb-4 text-center tracking-tight">
            Create Volunteer Post
          </h1>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-6 w-full "
          >
            <input
              id="title"
              className="px-4 py-2 text text-black rounded-md bg-gray-100"
              placeholder="Your Event's Name"
              type="text"
              {...register("title", { required: "Name is required" })}
              autoComplete="off"
            />
            {errors.title && (
              <ErrorText message={errors.title.message as string} />
            )}

            <input
              id="location"
              className="px-4 py-2 text text-black rounded-md bg-gray-100"
              placeholder="Enter Location"
              {...register("location", {
                required: "Location is required",
              })}
              autoComplete="off"
            />
            {errors.location && (
              <ErrorText message={errors.location.message as string} />
            )}

            <input
              id="date"
              className="px-4 py-2 text text-black rounded-md bg-gray-100"
              type="date"
              {...register("date", { required: "Date is required" })}
              autoComplete="off"
            />
            {errors.date && (
              <ErrorText message={errors.date.message as string} />
            )}

            <input
              id="eventTime"
              className="px-4 py-2 text text-black rounded-md bg-gray-100"
              placeholder="Enter Event Time (HH:MM) (use 24 hours time format)"
              type="text"
              {...register("eventTime", { required: "Event Time is required" })}
              autoComplete="off"
            />
            {errors.eventTime && (
              <ErrorText message={errors.eventTime.message as string} />
            )}

            <Button type="submit">Post</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVolunteer;