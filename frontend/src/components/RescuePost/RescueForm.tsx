import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../config/baseUrl";
import { toast } from "react-toastify";
import useGeolocation from "../../hooks/useGeolocation"; // Adjust the path to your useGeolocation hook

interface FormData {
  title: string;
  description: string;
  locationEnabled: boolean;
  rescuePostImage: File | null;
}

function RescueForm() {
  const [img, setImg] = useState<string>("/upload.png");
  const imgRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      locationEnabled: false,
      rescuePostImage: null,
    },
  });
  const { isLoading, position, error, getPosition } = useGeolocation();

  const locationEnabled = watch("locationEnabled");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("rescuePostImage", file);
      setImg(reader.result as string);

      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    imgRef.current?.click();
  };

  const onSubmit = async (data: FormData) => {
    if (locationEnabled && !position) {
      toast.error("Location is enabled, but no position data is available.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.rescuePostImage) {
      formData.append("rescuePostImage", data.rescuePostImage);
    }

    if (locationEnabled && position) {
      formData.append("lat", position.lat.toString());
      formData.append("lng", position.lng.toString());
      console.log(position);
    }
    try {
      console.log(formData);
      const { data } = await API.post("/api/v1/rescue-posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      toast.success(data.message);
      setImg('/upload.png')
      reset(); // Reset form after submission
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-[80%] p-5 rounded-lg shadow-md overflow-y-auto bg-white">
      <form
        className="flex flex-col gap-6 text-zinc-600"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>
          <span className="font-bold text-btnColor">Thank you!</span> for taking
          the time to report a case. Please fill out the form below with as much
          detail as possible.{" "}
        </h3>
        <input
          type="text"
          {...register("title")}
          placeholder="Enter title"
          className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
        />
        <textarea
          className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
          {...register("description")}
          placeholder="Enter the description..."
        ></textarea>
        <div className="flex justify-between items-center">
          Enable location:{" "}
          <input
            type="checkbox"
            {...register("locationEnabled")}
            className="rounded-lg h-5 w-5"
            onChange={() => {
              if (!locationEnabled) {
                getPosition();
              }
            }}
          />
        </div>

        <h3 className="text-center mt-8">Please choose an image to upload</h3>
        <div
          onClick={handleClick}
          className="cursor-pointer bg-white shadow-md p-9"
        >
          <img src={img} alt="Uploaded" className="h-auto w-full" />
          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
            ref={imgRef}
          />
        </div>

        <button
          type="submit"
          className="bg-btnColor hover:bg- text-white px-4 py-2 rounded-md mt-4"
        >
          Submit
        </button>
      </form>
      {isLoading && <p>Loading location...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default RescueForm;
