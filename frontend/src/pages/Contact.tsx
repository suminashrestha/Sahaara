import InputField from "../components/InputField";
import Button from "../components/Button";
function Contact() {
  return (
    <>
      <div className="justify-center text-center m-2 p-4 h-50 text-5xl font-bold text-secondary ">
        Contact us
      </div>
      <div className="flex justify-center ">
        <div className="justify-center w-[5%] h-[50%] p-5 flex-auto text-center ">
          <form className="flex  bg-gray-200 flex-col h-[100%] p-5 gap-3 w-[100%] text-left">
            <label htmlFor="name">Full Name</label>
            <InputField placeholder="Full Name" type="text" />

            <label htmlFor="email">Email</label>
            <InputField placeholder="Email" type="text" />

            <label htmlFor="phone">Phone</label>
            <InputField placeholder="Phone" type="text" />

            <label htmlFor="msg">Message</label>
            <textarea className="h-50"></textarea>
            <Button className="text-white font-bold h-[50px] w-[150px] px-3 py-2 bg-btnColor hover:bg-btnHover">
              Submit
            </Button>
          </form>
        </div>
        <div className=" p-5 m-2 flex-auto w-[5%]  ">
          <div className="bg-gray-200 flex flex-col gap-3 w-[70%] h-[80%] p-9">
            <h1 className=" text-center font-bold text-2xl text-secondary">
              Get in Touch:
            </h1>
            <h2 className="text-center  text-xl text-secondary">
              Fill in the form to start a conversation
            </h2>
            <div className="flex items-center mt-4 text-gray-600">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                +977 9800000000
              </div>
            </div>

            <div className="flex items-center mt-2 text-gray-600">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-gray-500"
              >
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="ml-4 text-md tracking-wide font-semibold w-40">
                abc@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
