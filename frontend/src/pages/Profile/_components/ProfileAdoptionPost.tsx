import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdoptionPost } from "../../../constants/common_interfaces";
import API from "../../../config/baseUrl";
import ProfileAdoptionCard from "./ProfileAdoptionCard";

const ProfileAdoptionPost = ({ userId }: { userId?: string }) => {
  const [adoptionPosts, setAdoptionPosts] = useState<AdoptionPost[] | null>(
    null
  );

  useEffect(() => {
    async function getAdoptionPosts() {
      try {
        const { data } = await API.get(
          `/api/v1/profile/${userId}/user-adoption-posts`
        );
        setAdoptionPosts(data.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
    getAdoptionPosts();
  }, [userId]);

  if (!adoptionPosts || adoptionPosts.length === 0) return null;

  return (
    <div className="w-full p-8">
      <div className="text-center font-bold text-2xl text-slate-950">
        Adoption Posts
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
        {adoptionPosts.map((post) => (
          <ProfileAdoptionCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfileAdoptionPost;