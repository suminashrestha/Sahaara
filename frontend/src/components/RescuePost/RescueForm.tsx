import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../config/baseUrl";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  description: string;
  locationEnabled: boolean;
  rescuePostImage: File | null;
}

function RescueForm() {
  const [img, setImg] = useState<string>("/upload.png");
  const imgRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit,reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      locationEnabled: false,
      rescuePostImage: null,
    },
  });
  const navigate=useNavigate()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    imgRef.current?.click();
  };

  const onSubmit = async(data: FormData) => {

    console.log(data)
    const formData=new FormData();
    formData.append("title",data.title)
    formData.append("description",data.description)

    if (data.rescuePostImage) {
      formData.append("rescuePostImage", data.rescuePostImage);
    }

    try {
      const {data}= await API.post("/api/v1/rescue-posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(data)
      // navigate()
      toast.success(data.message)
    } catch (error:any){
      console.log(error)
      toast.error(error.response.data.message)
    }
     reset(); // Reset form after submission

  };

  return (
    <div className="w-full h-[80%] p-5 rounded-lg shadow-md overflow-y-auto">
      <form className="flex flex-col gap-6 text-zinc-600" onSubmit={handleSubmit(onSubmit)}>
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
            />
        </div>

        <div onClick={handleClick} className="cursor-pointer bg-slate-200 p-9">
          <h3 className="text-center">Please choose an image to upload</h3>
          <img src={img} alt="Uploaded" className="h-auto w-full" />
          <input
            type="file"
            {...register("rescuePostImage")}
            className="hidden"
            onChange={handleImageChange}
            ref={imgRef}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RescueForm;
