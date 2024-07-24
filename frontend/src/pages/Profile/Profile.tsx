import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UserNav from "../../components/UserNav";
import API from "../../config/baseUrl";
import { CiLocationOn } from "react-icons/ci";
import CreateProfile from "./CreateProfile";
import useUser from "../../hooks/useUser";
import Loader from "../../components/Loader";
import { UserProfile } from "../../constants/common_interfaces";
import ProfileRescuePost from "./_components/ProfileRescuePost";
import ProfileAdoptionPost from "./_components/ProfileAdoptionPost";

const Profile = () => {
  const { userId } = useParams();
  const user = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function getProfile() {
      setIsLoading(true);
      try {
        const { data } = await API.get(`/api/v1/profile/${userId}`);
        setProfile(data.data);
      } catch (error) {
        console.log("error in profile", error);
      } finally {
        setIsLoading(false);
      }
    }
    getProfile();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!profile && user?._id === userId) {
    return (
      <>
        <UserNav />
        <CreateProfile setProfile={setProfile} />
      </>
    );
  }

  return (
    <div className="bg-gray-100">
      <UserNav />
      {profile ? (
        <div className="mx-auto p-6 mt-20 flex justify-center">
          <div className="h w-[70vw] p-8 rounded-lg shadow-md bg-white">
            <div className="border-b px-2 py-4">
              <strong className="font-bold text-xl">Profile details</strong>
            </div>
            <div className="border-b py-4 px-2 flex justify-between items-center">
              <div className="font-bold font-mono">Profile</div>

              <div className="flex items-center gap-x-2">
                {" "}
                <div className="font-semibold text-lg">
                  {profile?.name}
                  <span className="block text-sm font-medium">
                    @{profile?.user?.username}
                  </span>
                </div>
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={
                    profile?.profilePicture || "https://via.placeholder.com/150"
                  }
                  alt={`${profile.name}'s profile`}
                />
              </div>
            </div>

            <div className="border-b py-4 px-2 flex items-center justify-between">
              <div className="font-bold font-mono">Email Address</div>
              <div className="bg-green-500 px-4 py-2 rounded-lg text-white">
                <a href={`mailto:${profile?.user?.email}`}>
                  {profile?.user?.email}
                </a>
              </div>
            </div>
            <div className="py-4 px-2 flex items-center justify-between">
              <div className="font-bold font-mono">Location</div>
              <div className="bg-slate-500 px-4 py-1 rounded-lg text-white flex items-center gap-x-2">
                {profile?.location} <CiLocationOn size={20} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          This User hasn't made their profile yet. Come visit later.
        </div>
      )}
      {profile && (
        <>
          <ProfileAdoptionPost userId={userId} />
          <ProfileRescuePost userId={userId} />
        </>
      )}
    </div>
  );
};

export default Profile;