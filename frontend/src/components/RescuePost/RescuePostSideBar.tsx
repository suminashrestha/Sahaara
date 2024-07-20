import { Outlet } from "react-router";
import RescueNav from "./RescueNav";

function RescuePostSideBar() {
  return (
    <div className="h-[full] w-[40%] flex justify-center overflow-y-auto bg-slate-100">
      <div className="flex flex-col w-[90%]">
        <RescueNav/>
        <Outlet />
      </div>
    </div>
  );
}

export default RescuePostSideBar;
