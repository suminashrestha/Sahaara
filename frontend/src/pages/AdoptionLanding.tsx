import UserNav from "../components/UserNav";
import { useNavigate } from "react-router";
export default function AdoptionLanding() {
  const navigate = useNavigate();

  return (
    <div>
      <UserNav />
      <div className="mt-20 flex h-[90vh] w-full bg-[url('/adoption_landing.jpg')] bg-no-repeat bg-cover">
        <div className="flex flex-col items-end w-full h-full justify-center gap-8 p-9">
          <div
            className="border-transparent bg-btnColor hover:bg-slate-500 rounded-2xl text-white transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ... h-[25%] w-[35%]  p-5  items-center
          "
            onClick={() => {
              navigate("/createadoption");
            }}
          >
            <h3 className="p-3 font-bold text-2xl ">I want to rehome a pet.</h3>
            <p className="p-3">Start the process.</p>
          </div>
          <div
            className="border-transparent bg-btnColor hover:bg-slate-500 rounded-2xl text-white transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ... h-[25%] w-[35%]  p-5  items-center"
            onClick={() => {
              navigate("/viewadoption");
            }}
          >
            <h3 className="p-3 font-bold text-2xl">I want to adopt a pet.</h3>
            <p className="p-3">Search the available pets listed in Sahaara.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

