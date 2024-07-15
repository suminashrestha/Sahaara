import { useForm } from "react-hook-form";

function RescuePostSideBar() {
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

  return <div className="h-[full] bg-red-500 w-[40%]">
        <form></form>

  </div>;
}

export default RescuePostSideBar;
