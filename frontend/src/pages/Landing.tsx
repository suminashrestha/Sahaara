import { useEffect, useState } from "react";
import UserNav from "../components/UserNav";
import CreateAdoptionPost from "../components/CreateAdoptionPost";
function Profile() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  return (
    <div>
      <UserNav />

      {/* {user ? (
        <h1 className="text-4xl">hi {user.username}</h1>
      ) : (
        <h1 className="text-4xl">Loading...</h1>
      )} */}

      <CreateAdoptionPost />
    </div>
  );
}

export default Profile;
