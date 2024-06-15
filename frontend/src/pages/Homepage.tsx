import LandingNav from "../components/LandingNav";

export default function Homepage() {
  return (
    <>
      <LandingNav />
      <div className="w-full h-full flex  ">
        <div className="flex-auto items-center w-[50%] h-[90%]  m-4 flex-cols gap-2">
          <div className="flex flex-col items-center w-full h-[65%] gap-6 justify-center px-6">
            <h1 className="text-btnHover font-semibold font-Oswald tracking-tighter text-7xl uppercase">
              Connecting hearts and homes for every animal in need
            </h1>
            <p className=" p-2 text-2xl">
              Join us in making a difference in the lives of animals – together,
              we can create happier, healthier futures for every pet in need.
            </p>
          </div>
          <div className="flex flex-cols items-center w-full h-[10%] flex-cols justify-center gap-9 mt-7">
            <button className="bg-btnColor px-12 py-6 text-xl font-bold rounded-lg text-white hover:bg-btnHover ">
              Donate Now
            </button>
            <button className="bg-btnColor px-12 py-6 text-xl font-bold rounded-lg text-white hover:bg-btnHover">
              Join Us
            </button>
          </div>
        </div>
        <div className="flex items-center w-[50%] h-[80%] m-4 flex-cols gap-5">
          <img
            className="w-full h-full object-cover shadow-lg rounded-lg"
            src="sadFace.jpeg"
            alt="dog"
          />
        </div>
      </div>
    </>
  );
}
