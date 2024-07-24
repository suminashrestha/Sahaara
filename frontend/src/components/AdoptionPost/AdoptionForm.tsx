import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Button from "../Button";
import { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface AdoptionFormProps {
  email: string | undefined;
  phone: string | undefined;
  name: string | undefined;
  address: string | undefined;
}

interface EnquiryForm {
  numberOfFamily: number,
  residence: string,
  homeStatus: string,
  haveOtherPets: string,
  allergies: string,
  petExperience: string
}

function AdoptionForm({ email, phone, address, name }: AdoptionFormProps) {
  const defaultEmail = email ?? "no email provided";
  const defaultPhone = phone ?? "000-000-0000";
  const defaultAddress = address ?? "No address provided";
  const defaultName = name ?? "No name provided";
  const [showForm, setShowForm] = useState(false);

  function handleVisiblity() {
    setShowForm((showForm) => !showForm);
  }

  const { register, reset, handleSubmit } = useForm<EnquiryForm>({
    defaultValues: {
        numberOfFamily: 1,
        residence: "",
        homeStatus: "",
        haveOtherPets: "",
        allergies: "",
        petExperience:""
    }
  });

  const submitEnquiry=(data)=>{
        
  }
  return (
    <div className="flex flex-col h-[500px] w-[500px] gap-5 text-zinc-600 justify-center bg-white shadow-md rounded-lg">
      {!showForm ? (
        <div className="flex w-full flex-col h-full p-9 gap-9 justify-evenly">
          <h1 className="text-center text-4xl font-semibold border-b-2 p-9">CONTACT</h1>
          <ul className="grid grid-row-4 gap-5">
            <li className="flex items-center gap-4">
              <h1 className="font-semibold">Author name: </h1>
              <h1 className="text-lg text-center"> {defaultName}</h1>
            </li>
            <li className="flex items-center gap-8">
              <MdOutlineEmail size={20} />
              <h1 className="text-lg text-center"> {defaultEmail}</h1>
            </li>
            <li className="flex items-center gap-8">
              <CiLocationOn size={20} />
              <h1 className="text-lg text-center"> {defaultAddress}</h1>
            </li>
            <li className="flex items-center gap-8">
              <FaPhoneAlt size={20} />
              <h1 className="text-lg text-center"> {defaultPhone}</h1>
            </li>
          </ul>
          <Button
            className="w-1/2 h-[50px] self-center"
            onClick={handleVisiblity}
          >
            I'm Interested
          </Button>
        </div>
      ) : (
        <div className="w-full h-full px-3 py-8 flex flex-col gap-9 ">
          <div className="flex gap-4">
            <IoArrowBackCircle size={50} onClick={() => setShowForm(false)} />
            <h2 className="text-zinc-500 ">
              Kindly fill out the form with your details so the post creator can
              get back to you.
            </h2>
          </div>
          <form className="flex flex-col gap-4 overflow-y-auto" onSubmit={handleSubmit(submitEnquiry)}>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">About your home</h1>
              <div className="flex gap-2">
                <label htmlFor="livingsituation" className="text-md font-semibold">
                  Please descibe your living home situation
                </label>
                <select
                  {...register("homeStatus")}
                  className="p-1 bg-gray-100 focus:outline-none rounded-lg"
                  id="homeStatus"
                >
                  <option value="Own home">Own your home</option>
                  <option value="Rented home">Rent your home</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-2">
                <label htmlFor="residence" className="font-semibold">Your residence loacted in</label>
                <select
                  {...register("residence")}
                  className="p-1 bg-gray-100 focus:outline-none rounded-lg"
                  id="residence"
                >
                  <option value="rural">Rural</option>
                  <option value="suburban">Sub Urban</option>
                  <option value="town">Town</option>
                  <option value="city">City</option>
                </select>
              </div>

              <div className="flex gap-2 items-center">
                <label htmlFor="numberOfFamily" className="font-semibold">
                  Enter the number of family members{" "}
                </label>
                <input
                  type="text"
                  {...register("numberOfFamily")}
                  className="p-3 text-sm text-zinc-600 rounded-lg bg-gray-100 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <label htmlFor="haveOtherPets" className="font-semibold">
                  Do you have any other pets?
                </label>
                <select
                  {...register("haveOtherPets")}
                  className="p-1 bg-gray-100 focus:outline-none rounded-lg"
                  id="haveOtherPets"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="flex gap-2">
                <label htmlFor="allergies" className="font-semibold">
                  Does anyone in the household have any allergies to pets?
                </label>
                <select
                  {...register("allergies")}
                  className="p-1 bg-gray-100 focus:outline-none rounded-lg"
                  id="allergies"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="flex flex-col gap-4">
                <label htmlFor="petexperience" className="font-semibold">
                  Your experience with animals:{" "}
                </label>
                <textarea
                  placeholder="Please describe your experience of any previous pet ownership and tell us about the type of home you plan to offer your new pet..."
                  className="h-[100px] w-full rounded-lg p-3 text-sm focus:outline-none bg-gray-100"
                  id="petexper"
                ></textarea>
              </div>
            </div>
            <Button>Submit</Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdoptionForm;
