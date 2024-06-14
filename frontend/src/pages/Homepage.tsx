export default function Homepage() {
  return (
    <>
      <div className="flex flex-col max-h-screen overflow-y-scroll">
        <div className="w-full bg-[#d6a9d5] text-white p-5 text-center text-2xl">
          Welcome
        </div>

        <div className=" flex-auto relative w-2/3 h-120 bg-cover bg-center bg-np-repeat bg-[url('/playDog.jpeg')]">
          <div className="absolute bottom-0 right-0 bg-gray-2000 bg-opacity-50 text-white text-2xl p-6 m-4 w-1/3 h-1/3 backdrop-blur-md">
            Help Save Lives
          </div>
        </div>
      </div>
    </>
  );
}
