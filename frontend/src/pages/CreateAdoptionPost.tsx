import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import API from "../config/baseUrl";
import UserNav from "../components/UserNav";
import { AdoptionPostSchema } from "../redux/reducers/AdoptionReducer/AdoptionReducerInterface";

const CreateAdoptionPost = () => {
  const [img, setImg] = useState<string>("/upload.png");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<AdoptionPostSchema>({
    defaultValues: {
      name: "",
      breed: "",
      age: "",
      gender: "unknown", // assuming 'unknown' as a default value
      size: "medium", // assuming 'medium' as a default value
      color: "",
      coatLength: "short",
      characterstics: "",
      health: "",
      contact: {
        email: "",
        phone: "",
        name: "",
        address: "",
      },
      myStory: "",
      category: "", //
      adoptionPostImage: null,

    },
  });

  const formSubmit = async (data: AdoptionPostSchema) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("breed", data.breed);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("size", data.size);
      formData.append("color", data.color);
      formData.append("coatLength", data.coatLength);
      formData.append("myStory", data.myStory);
      formData.append("characterstics", data.characterstics);
      formData.append("contact.email", data.contact.email);
      formData.append("contact.phone", data.contact.phone);
      formData.append("contact.address", data.contact.address);
      formData.append("contact.name", data.contact.name);
      formData.append("health", data.health);
      formData.append("contact", JSON.stringify(data.contact));

      if (data.adoptionPostImage) {
        formData.append("adoptionPostImage", data.adoptionPostImage);
      }
      console.log(formData)
      const response = await API.post("/api/v1/adoption-posts",formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          body: JSON.stringify(data),
        },
      });

      toast.success("Adoption post created successfully!");

      reset();
      // navigate("/");
    } catch (error) {
      toast.error("Failed to create adoption post.");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValue("adoptionPostImage", file);
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const imgRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <UserNav />
      <div className="flex mt-20 items-center h-[90vh] justify-between">
        <div className="w-[15%] h-[50vh] ">
          <ul className="flex flex-col h-full w-full justify-between items-center p-7 font-semibold">
            <li>Photo</li>
            <li>Description</li>
            <li>Key Facts</li>
            <li>Pet Story</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="w-[85%] h-[90vh] flex justify-center items-center">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="overflow-y-auto h-full w-[90%] flex flex-col p-9 bg-slate-100 text-zinc-600 gap-9"
          >
            {/* image */}
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-2xl">Photos</h2>
              <p className="text-md">Please add the image of the pet </p>
              <div
                className="h-[400px] w-[400px] bg-white rounded-lg cursor-pointer"
                onClick={() => imgRef.current?.click()}
              >
                <img src={img} alt="" className="h-full w-full" />
              </div>
            </div>

            {/* characterstics */}

            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-2xl">Description</h2>
              <div className="flex gap-12 w-full p-9">
                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="petname">
                    Petname<span className="text-red-500">*</span> :
                  </label>
                  <input
                    id="petname"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("name", { required: "Pets Name is required" })}
                    autoComplete="off"
                  />
                </div>
                {errors.name && toast.error(errors.name.message)}

                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="category">
                    Category<span className="text-red-500">*</span> :
                  </label>
                  <input
                    id="category"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("category", {
                      required: "Pets Name is required",
                    })}
                    autoComplete="off"
                  />
                  {errors.category && toast.error(errors.category.message)}
                </div>

                <div className="flex gap-3 items-center text-sm">
                  <label htmlFor="gender">Gender</label>
                  <select
                    {...register("gender")}
                    className="p-1 bg-white focus:outline-none"
                    id="gender"
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="unknown">unknown</option>
                  </select>
                </div>

                <div className="flex gap-3 items-center text-sm">
                  Size:
                  <select
                    {...register("size")}
                    className="p-1 bg-white focus:outline-none"
                    defaultValue="medium"
                  >
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-9 w-full p-9">
                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="age">
                    Age<span className="text-red-500">*</span> :
                  </label>

                  <input
                    id="age"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("age", { required: "age is required" })}
                    autoComplete="off"
                  />
                  {errors.age && toast.error(errors.age.message)}
                </div>

                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="breed">Breed: </label>
                  <input
                    id="breed"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("breed")}
                    autoComplete="off"
                  />
                </div>

                <div className="flex gap-3 items-center text-sm">
                  Coat Length:
                  <select
                    {...register("size")}
                    className="p-1 bg-white focus:outline-none"
                    defaultValue="medium"
                  >
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-9 w-full p-9">
                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="breed">
                    Color<span className="text-red-500">* </span>:{" "}
                  </label>
                  <input
                    id="color"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("color", { required: "color is required" })}
                    autoComplete="off"
                  />
                  {errors.color && toast.error(errors.color.message)}
                </div>
               
                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="health">
                    Health<span className="text-red-500">* </span>:{" "}
                  </label>
                  <input
                    id="health"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("health", { required: "health is required" })}
                    autoComplete="off"
                  />
                  {errors.health && toast.error(errors.health.message)}
                </div>
              </div>
            </div>

            {/* keyfacts */}
            <div className="flex flex-col gap-5">
              <h2 className="font-semibold text-2xl">Key facts</h2>

              <textarea
                id="facts"
                className="h-[100px] w-full rounded-lg p-3 text-sm focus:outline-none"
                placeholder="Please enter the characterstics of the pet. eg: joyful, trained...."
                {...register("characterstics", {
                  required: "Some characters are required",
                })}
              ></textarea>
              {errors.characterstics &&
                toast.error(errors.characterstics.message)}
            </div>

            {/* Petstory */}
            <div className="flex flex-col gap-5">
              <h2 className="font-semibold text-2xl">Pet Story</h2>
              <textarea
                {...register("myStory", { required: "story is required" })}
                id="petstory"
                className="h-[100px] w-full rounded-lg p-3 text-sm focus:outline-none"
                placeholder="Share anything here about your pet. (Your pet profile will be visible to the public. For your safety, do not include any personal details or contact information)"
              ></textarea>
              {errors.myStory && toast.error(errors.myStory.message)}
            </div>

            {/* contact */}
            <div className="flex flex-col gap-5">
              <h2 className="font-semibold text-2xl">Contact</h2>

              <div className="flex gap-9 w-full p-9">
                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="phone">
                    {" "}
                    Phone<span className="text-red-500">* </span>:{" "}
                  </label>
                  <input
                    id="phone"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("contact.phone", {
                      required: "phone is required",
                    })}
                    autoComplete="off"
                  />
                  {errors.contact?.phone &&
                    toast.error(errors.contact.phone.message)}
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="email">
                    Email<span className="text-red-500">* </span>:{" "}
                  </label>
                  <input
                    id="email"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="email"
                    {...register("contact.email", {
                      required: "email is required",
                    })}
                    autoComplete="off"
                  />
                  {errors.contact?.email &&
                    toast.error(errors.contact.email.message)}
                </div>

                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="name">Your name: </label>
                  <input
                    id="name"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("contact.name")}
                    autoComplete="off"
                  />
                </div>

                <div className="flex gap-3 text-sm items-center">
                  <label htmlFor="location">Location: </label>
                  <input
                    id="location"
                    className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                    type="text"
                    {...register("contact.address")}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            {/* imageupload */}
            <input
              id="adoptionPostImage"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              ref={imgRef}
            />
            {errors.adoptionPostImage && (
              <ErrorText message={errors.adoptionPostImage.message as string} />
            )}

            <Button>Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAdoptionPost;



