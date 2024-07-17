import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { contactForm, contactSchema } from "../validators/contactValidators";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "../components/ErrorText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";
import BottomContact from "../components/BottomContact";

interface contactSchema {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}
const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<contactForm>({
    resolver: zodResolver(contactSchema),
    mode: "all",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function formSubmit(data: contactSchema) {
    toast.success("Thank you for reaching us!");
    reset();
  }
  return (
    <>
      <LandingNav />
      <div className="w-[100vw] h-[90vh] mt-20 flex justify-center items-center gap-6">
        <div className="flex flex-col w-[50%]  h-[80%] justify-between ">
          <div className="flex flex-col gap-3 h-[50%] p-10">
            <h2 className="text-6xl font-bold">Contact Us</h2>
            <p>Email, call or complete the form to send us your inquiry. </p>
            <p>sahaara@gmail.com</p>
            <p>01-5100000</p>
            <p>Customer support</p>
          </div>
          <div className="flex w-[100%] h-[50%] gap-6 items- p-10 justify-between ">
            <div className="w-[30%] flex flex-col gap-3 items-center">
              <h3 className="text-sm font-bold">Customer Support</h3>
              <p className="text-center">
                Our support team is vailable around the clock to address any
                concern or queries you ay have
              </p>
            </div>

            <div className="w-[30%] flex flex-col gap-3 items-center ">
              <h3 className="text-sm font-bold">Feedback</h3>
              <p className="text-center">
                Our support team is vailable around the clock to address any
                concern or queries you ay have
              </p>
            </div>

            <div className="w-[30%] flex flex-col gap-3 items-center">
              <h3 className="text-sm font-bold">Media Inquiries</h3>
              <p className="text-center">
                Our support team is vailable around the clock to address any
                concern or queries you ay have
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[90vh] w-[50%] justify-center items-center">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex flex-col h-[80%] p-10 gap-6 w-[80%] rounded-lg shadow-md text-zinc-600"
          >
            <div>
              <h3 className="text-4xl font-bold">Get in touch</h3>
              <p className="text-md">You can reach us anytime</p>
            </div>
            <input
              id="name"
              className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
              placeholder="Full Name"
              type="text"
              {...register("fullName")}
              autoComplete="off"
            />
            {errors.fullName && (
              <ErrorText message={errors.fullName.message as string} />
            )}

            <input
              id="email"
              className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
              placeholder="Email"
              type="text"
              {...register("email")}
              autoComplete="off"
            />
            {errors.email && (
              <ErrorText message={errors.email.message as string} />
            )}

            <input
              id="phone"
              className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
              placeholder="Phone"
              type="text"
              {...register("phone")}
              autoComplete="off"
            />
            {errors.phone && (
              <ErrorText message={errors.phone.message as string} />
            )}

            <textarea
              className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
              {...register("message")}
              placeholder="Please write your query here..."
            ></textarea>
            {errors.message && (
              <ErrorText message={errors.message.message as string} />
            )}

            <Button className="text-white font-bold px-3 py-2 bg-btnColor hover:bg-btnHover">
              Submit
            </Button>
          </form>
        </div>
      </div>
      <Footer />
      <BottomContact />
    </>
  );
};

export default Contact;
