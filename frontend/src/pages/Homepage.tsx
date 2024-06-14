export default function Homepage() {
  return (
    <>
      <div className="w-full h-full flex  ">
        <div className="flex-auto items-center w-[50%] h-[80%]  m-4 flex-cols gap-2">
          <div className="flex flex-col items-center w-full h-[65%] m-2  justify-around">
            <h1 className="text-black font-semibold font-Oswald tracking-tighter text-7xl m-11 p-2 ">
              Connecting hearts and homes for every animal in need
            </h1>
            <p className=" p-2 text-3xl m-11">
              Join us in making a difference in the lives of animals – together,
              we can create happier, healthier futures for every pet in need.
            </p>
          </div>
          <div className="flex items-center w-[90%] h-[30%]  m-9 p-12 flex-cols gap-9">
            <button className="bg-btnColor px-12 py-6 text-xl font-bold rounded-lg text-white hover:bg-btnHover">
              Donate Now
            </button>
            <button className="bg-btnColor px-12 py-6 text-xl font-bold rounded-lg text-white hover:bg-btnHover">
              Join Us
            </button>
          </div>
        </div>
        <div className="flex-auto items-center w-[50%] h-[80%] bg-blue-200 m-4 flex-cols gap-5">
          <img
            className="w-full h-full object-cover"
            src="sadFace.jpeg"
            alt="dog"
          />
        </div>
      </div>
    </>
  );
}
