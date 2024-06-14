function SignupLoginSidebar({ status }: { status: string }) {
  return (
    <div className=" h-[80%] w-[40%] shadow-md bg-cover bg-[url('/dog.avif')] flex flex-col-reverse items-center p-3">
      {status === "login" && (
        <div className="backdrop-blur-lg w-full">
          <h2 className="text-5xl font-Oswald text-btnColor">WELCOME BACK</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates, eos natus
          </p>
        </div>
      )}
      {status === "signup" && (
        <div className="backdrop-blur-lg w-full">
          <h2 className="text-5xl font-Oswald text-btnColor">BE A SAHAARA</h2>
          <p>By registering</p>
        </div>
      )}
    </div>
  );
}

export default SignupLoginSidebar;
