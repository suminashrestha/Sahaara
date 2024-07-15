import { useForm } from "react-hook-form";

function RescueForm() {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: {
        lat: 27.7172,
        lng: 85.324,
      },
      rescuePostImage: "",
    },
  });

  return (
    <div className="h-[full] bg-red-500 w-[40%]">
      <form>
        <input type="text" {...register("title")} placeholder="Enter title" />
        <textarea
          className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
          {...register("description")}
          placeholder="Enter the description..."
        ></textarea>
      </form>
    </div>
  );
}

export default RescueForm;
