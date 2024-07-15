import { useEffect, useState } from "react";
import UserNav from "../components/UserNav";
import RescuePostSideBar from "../components/RescuePost/RescuePostSideBar";
import RescueMap from "../components/RescuePost/RescueMap";

function Profile() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  return (
    <div>
      <UserNav />
      <div className="h-[90vh] w-full flex mt-20 ">
        <RescuePostSideBar />
        <RescueMap />
      </div>
      {/* {user ? (
        <h1 className="text-4xl">hi {user.username}</h1>
      ) : (
        <h1 className="text-4xl">Loading...</h1>
      )} */}
    </div>
  );
}

export default Profile;
