import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import API from "../config/baseUrl";
import { useNavigate } from "react-router";
import UserNav from "../components/UserNav";

interface AdoptionPostSchema {
  title: string;
  description: string;
  location: string;
  category: string;
  adoptionPostImage: File | null;
}

const CreateAdoptionPost = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdoptionPostSchema>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      category: "",
      adoptionPostImage: null, // Initialize image as null
    },
  });

  const formSubmit = async (data: AdoptionPostSchema) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("category", data.category);

      if (data.adoptionPostImage) {
        formData.append("adoptionPostImage", data.adoptionPostImage);
      }
      const response = await API.post("/api/v1/adoption-posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      toast.success("Adoption post created successfully!");
      reset(); // Reset form after submission
      navigate("/"); // Navigate to view posts page
    } catch (error) {
      console.error("Error creating adoption post:", error);
      toast.error("Failed to create adoption post.");
    }
  };

  return (
    <div>
      <UserNav />

      <div className="w-full h-screen flex flex-col items-center justify-center p-6 mt-20">
        <div className="flex flex-col items-center justify-center bg-red p-6 rounded shadow-lg w-full ">
          <h1 className="text-2xl font-bold mb-4">Create Adoption Post</h1>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <input
              id="title"
              className="p-3 text-sm text-black rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Enter title"
              type="text"
              {...register("title", { required: "Title is required" })}
              autoComplete="off"
            />
            {errors.title && (
              <ErrorText message={errors.title.message as string} />
            )}

            <input
              id="description"
              className="p-3 text-sm text-black rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Enter description..."
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
              autoComplete="off"
            />
            {errors.description && (
              <ErrorText message={errors.description.message as string} />
            )}

            <input
              id="location"
              className="p-3 text-sm text-black rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Location"
              type="text"
              {...register("location", { required: "Location is required" })}
              autoComplete="off"
            />
            {errors.location && (
              <ErrorText message={errors.location.message as string} />
            )}
            <input
              id="category"
              className="p-3 text-sm text-black rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Category"
              type="text"
              {...register("category", { required: "Location is required" })}
              autoComplete="off"
            />
            {errors.category && (
              <ErrorText message={errors.category.message as string} />
            )}

            {/* Input for image upload */}
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              id="adoptionPostImage"
              type="file"
              className="p-3 text-sm text-black rounded-lg bg-gray-100 focus:outline-none"
              {...register("adoptionPostImage", {
                required: "Image is required",
              })}
            />

            {errors.adoptionPostImage && (
              <ErrorText message={errors.adoptionPostImage.message as string} />
            )}

            <Button type="submit">Post</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdoptionPost;
