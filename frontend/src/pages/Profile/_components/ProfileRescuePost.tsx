import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RescuePost } from "../../../constants/common_interfaces";
import API from "../../../config/baseUrl";
import ProfileRescueCard from "./ProfileRescueCard";

const ProfileRescuePost = ({ userId }: { userId?: string }) => {
  const [rescuePosts, setRescuePosts] = useState<RescuePost[] | null>(null);

  useEffect(() => {
    async function getRescuePosts() {
      try {
        const { data } = await API.get(
          `/api/v1/profile/${userId}/user-rescue-posts`
        );
        setRescuePosts(data.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
    getRescuePosts();
  }, [userId]);

  if (!rescuePosts || rescuePosts.length === 0) return null;

  return (
    <div className="w-full p-8">
      <div className="text-center font-bold text-2xl text-slate-950">
        Rescue Posts
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
        {rescuePosts.map((post) => (
          <ProfileRescueCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfileRescuePost;