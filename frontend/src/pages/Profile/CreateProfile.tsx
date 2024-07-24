import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../config/baseUrl";
import ErrorText from "../../components/ErrorText";
import Button from "../../components/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserProfile } from "../../constants/common_interfaces";
import useUser from "../../hooks/useUser";

interface ProfileSchema {
  name: string;
  location: string;
  profilePicture: File | null;
}

interface CreateProfileProps {
  setProfile: Dispatch<SetStateAction<UserProfile | null>>;
}

const CreateProfile: React.FC<CreateProfileProps> = ({ setProfile }) => {
  const [text, setText] = useState(
    "You haven't created a profile yet. So may be you can make one!"
  );

  const _user = useUser();

  useEffect(() => {
    setTimeout(() => {
      setText("");
    }, 5000);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileSchema>({
    defaultValues: {
      name: "",
      location: "",
      profilePicture: null,
    },
  });

  const formSubmit = async (data: ProfileSchema) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
      }

      const response = await API.post("/api/v1/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        return;
      }
      console.log("--daaataa responsee guysssssss", response.data);
      setProfile({
        _id: response.data.data._id,
        location: response.data.data.location,
        name: response.data.data.name,
        profilePicture: response.data.data.profilePicture,
        user: {
          _id: _user?._id as string,
          email: _user?.email as string,
          isVolunteer: _user?.isVolunteer,
          type: _user?.type as string,
          username: _user?.username as string,
        },
      });
      toast.success("User Profile Created");
      reset();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePicture", file);
    }
  };

  return (
    <div>
      <div className="w-full h-[85vh] flex flex-col items-center justify-center p-6 mt-20">
        <div className="flex flex-col justify-center bg-red p-6 rounded shadow-lg md:w-1/3 ">
          {text && <span className="text-sm text-red-500">{text}</span>}
          <h1 className="text-3xl font-bold mb-4 text-center tracking-tight">
            Create Profile
          </h1>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-6 w-full "
          >
            <input
              id="title"
              className="px-4 py-2 text text-black rounded-md bg-gray-100 border-slate-900 border-2 "
              placeholder="Your Full Name"
              type="text"
              {...register("name", { required: "Name is required" })}
              autoComplete="off"
            />
            {errors.name && (
              <ErrorText message={errors.name.message as string} />
            )}

            <input
              id="location"
              className="px-4 py-2 text text-black rounded-md bg-gray-100 border-slate-900 border-2 "
              placeholder="Your Address"
              {...register("location", {
                required: "Location is required",
              })}
              autoComplete="off"
            />
            {errors.location && (
              <ErrorText message={errors.location.message as string} />
            )}

            <input
              id="profilePicture"
              className="px-4 py-2 text text-black rounded-md bg-gray-100 border-slate-900 border-2 "
              type="file"
              onChange={handleImageChange}
            />
            {errors.profilePicture && (
              <ErrorText message={errors.profilePicture.message as string} />
            )}

            <Button type="submit">Post</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
