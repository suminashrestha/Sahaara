import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  return (
    <div>
      {user ? (
        <h1 className="text-4xl">hi {user.username}</h1>
      ) : (
        <h1 className="text-4xl">Loading...</h1>
      )}
    </div>
  );
}

export default Profile;
