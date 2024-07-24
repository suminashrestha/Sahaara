import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInView } from "react-intersection-observer";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import API from "../config/baseUrl";
import UserNav from "../components/UserNav";

interface IAdoption{
  _id: string;
  name: string;
  age: string;
  breed: string;
  gender: string;
  size: string;
  color: string;
  coatLength: string;
  characterstics: string;
  health: string;
  contact: {
    email: string;
    phone: string;
    name: string;
    address: string;
  };
  myStory: string;
  category: string;
  adoptionImage?: string;
  createdAt: string;
  adoptionPostImage?: File | null;
}
const CreateAdoptionPost = () => {
  const [img, setImg] = useState<string>("/upload.png");


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<IAdoption>({
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
      category: "", 
      adoptionPostImage: null,
    },
  });

  const formSubmit = async (data: IAdoption) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("breed", data.breed);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("category", data.category);
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
      const response = await API.post("/api/v1/adoption-posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          body: JSON.stringify(data),
        },
      });

      console.log(response);
      toast.success(response.data.message);

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

  const sections = ["photo", "description", "keyFacts", "petStory", "contact"];
  const [activeSection, setActiveSection] = useState<string>("");

  const { ref: photoRef, inView: photoInView } = useInView({});
  const { ref: descriptionRef, inView: descriptionInView } = useInView({});
  const { ref: keyFactsRef, inView: keyFactsInView } = useInView({
    rootMargin: "-60% 0% 0% 0% ", threshold: 0.5
  });
  const { ref: petStoryRef, inView: petStoryInView } = useInView({
    rootMargin: "-60% 0% 0% 0% ", threshold: 0.5
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    rootMargin: "-60% 0% 0% 0% ", threshold: 0
  });

  useEffect(() => {
    if (photoInView) setActiveSection("photo");
    else if (descriptionInView) setActiveSection("description");
    else if (keyFactsInView) setActiveSection("keyFacts");
    else if (petStoryInView) setActiveSection("petStory");
    else if (contactInView) setActiveSection("contact");
  }, [
    photoInView,
    descriptionInView,
    keyFactsInView,
    petStoryInView,
    contactInView,
  ]);

  return (
    <>
      <UserNav />
      <div className="flex mt-20 items-center h-[90vh] justify-around">
        <div className="w-[25%] h-[50vh] p-7">
          <ul className="h-full w-full font-semibold grid grid-row-5 gap-2 ">
            {sections.map((section) => (
              <li
                key={section}
                className={`cursor-pointer w-full flex items-center justify-center shadow-md rounded-lg ${
                  activeSection === section ? "bg-btnColor text-white" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[75%] h-[90vh] flex justify-center items-center">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="overflow-y-auto h-full w-full flex flex-col p-9 bg-slate-100 text-zinc-600 gap-9"
          >
            {/* image */}
            <h2 className="font-semibold text-2xl">Photos</h2>
            <div className="flex flex-col gap-3" id="photo" ref={photoRef}>
              <p className="text-md">Please add the image of the pet </p>
              <div
                className="h-[400px] w-[400px] bg-white rounded-lg cursor-pointer p-8"
                onClick={() => imgRef.current?.click()}
              >
                <img src={img} alt="" className="h-full w-full" />
              </div>
            </div>

            {/* characterstics */}

            <h2 className="font-semibold text-2xl" ref={descriptionRef}>
              Description
            </h2>
            <div className="grid grid-cols-3 gap-9 p-9" id="description">
              <div className="flex gap-3 text-sm items-center">
                <label htmlFor="petname">Petname :</label>
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
                <label htmlFor="category">Category :</label>
                <input
                  id="category"
                  className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                  type="text"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  autoComplete="off"
                />
                {errors.category && toast.error(errors.category.message)}
              </div>

              <div className="flex gap-3 items-center text-sm">
                <label htmlFor="gender">Gender</label>
                <select
                  {...register("gender")}
                  className="p-1 bg-white focus:outline-none rounded-lg"
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
                  className="p-1 bg-white focus:outline-none rounded-lg"
                  defaultValue="medium"
                >
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                </select>
              </div>

              <div className="flex gap-3 text-sm items-center">
                <label htmlFor="age">Age :</label>

                <input
                  id="age"
                  className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                  type="text"
                  {...register("age", { required: "Age is required" })}
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
                  {...register("coatLength")}
                  className="p-1 bg-white focus:outline-none rounded-lg"
                  defaultValue="short"
                >
                  <option value="short">short</option>
                  <option value="medium">medium</option>
                  <option value="long">long</option>
                </select>
              </div>

              <div className="flex gap-3 text-sm items-center">
                <label htmlFor="color">Color: </label>
                <input
                  id="color"
                  className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                  type="text"
                  {...register("color", { required: "Color is required" })}
                  autoComplete="off"
                />
                {errors.color && toast.error(errors.color.message)}
              </div>

              <div className="flex gap-3 text-sm items-center">
                <label htmlFor="health">Health: </label>
                <input
                  id="health"
                  className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                  type="text"
                  {...register("health", { required: "Health is required" })}
                  autoComplete="off"
                />
                {errors.health && toast.error(errors.health.message)}
              </div>
            </div>

            {/* keyfacts */}
            <h2 className="font-semibold text-2xl">Key facts</h2>
            <div className="flex flex-col gap-5" ref={keyFactsRef}>
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

            <h2 className="font-semibold text-2xl">Pet Story</h2>
            <div
              className="flex flex-col gap-5"
              id="petStory"
              ref={petStoryRef}
            >
              <textarea
                {...register("myStory", { required: "Story is required" })}
                id="petstory"
                className="h-[100px] w-full rounded-lg p-3 text-sm focus:outline-none"
                placeholder="Share anything here about your pet. (Your pet profile will be visible to the public. For your safety, do not include any personal details or contact information)"
              ></textarea>
              {errors.myStory && toast.error(errors.myStory.message)}
            </div>

            {/* contact */}
            <h2 className="font-semibold text-2xl" ref={contactRef}>
              Contact
            </h2>
            <div className="grid grid-cols-3 gap-9 p-9" id="contact">
              <div className="flex gap-3 text-sm items-center">
                <label htmlFor="phone"> Phone: </label>
                <input
                  id="phone"
                  className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                  type="text"
                  {...register("contact.phone", {
                    required: "Phone is required",
                  })}
                  autoComplete="off"
                />
                {errors.contact?.phone &&
                  toast.error(errors.contact.phone.message)}
              </div>
              <div className="flex gap-3 text-sm items-center">
                <label htmlFor="email">Email: </label>
                <input
                  id="email"
                  className="p-3 text-sm text-zinc-600 rounded-lg bg-white focus:outline-none"
                  type="email"
                  {...register("contact.email", {
                    required: "Email is required",
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
