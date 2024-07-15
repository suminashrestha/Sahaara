import Button from "../components/Button";
import { useForm } from "react-hook-form";
import ErrorText from "../components/ErrorText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import UserNav from "../components/UserNav"
import BottomContact from "../components/BottomContact";

interface AdoptionPostSchema {
    adoptionPostAuthor: number,
    title: string,
    description: string,
    location: string,
    category: string,
    adoptionPostImage: string,
    adoptersList: Array<string>
}
const CreateAdoptionPost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdoptionPostSchema>({
    defaultValues: {
        adoptionPostAuthor: undefined,
        title: "",
        description: "",
        location: "",
        category: "",
        adoptionPostImage: "",
        adoptersList: []
    },
  });

  function formSubmit(data: AdoptionPostSchema) {
    console.log(data);
    toast.success("Thank you for reaching us!");
    reset();
  }
  return (
      <>
        <UserNav/>
        <div className="w-[100vw] h-[90vh] mt-20 flex justify-center items-center gap-6">
          <div className="flex h-[90vh] w-[50%] justify-center items-center">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col h-[80%] p-10 gap-6 w-[80%] rounded-lg shadow-md text-zinc-600"
          >
            <input
              id="title"
              className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
              placeholder="Enter title"
              type="text"
              {...register("title")}
              autoComplete="off"
            />

            <input
              id="description"
              className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
              placeholder="Enter description..."
              type="text"
              {...register("description")}
              autoComplete="off"
            />


            <input
              id="location"
              className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
              placeholder="location"
              type="text"
              {...register("location")}
              autoComplete="off"
            />
           
            <Button className="text-white font-bold px-3 py-2 bg-btnColor hover:bg-btnHover">
              Submit
            </Button>
          </form>
          </div>
        </div>
      </>
  ) 
};

export default CreateAdoptionPost;





// adoptionPostAuthor: number ,
//     title: string,
//     description: string,
//     location: string,
//     adoptionPostImage: string,
//     adoptersList: Array<string>