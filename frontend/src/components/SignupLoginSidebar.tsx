function SignupLoginSidebar({ status }) {
  return (
    <div className=" h-[80%] w-[40%] shadow-md bg-cover bg-[url('/dog.avif')] flex flex-col-reverse items-center p-3">
      {status === "login" && (
        <div>
          <h2 className="text-4xl">welcome</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptates, eos natus quam quo ratione, dolorum nesciunt dolores
            quidem iusto suscipit animi, facilis ut provident? Vel nam quam hic
            maxime possimus.
          </p>
        </div>
      )}
      {status === "signup" && <h2>shdknf</h2>}
    </div>
  );
}

export default SignupLoginSidebar;
