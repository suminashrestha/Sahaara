import { RescuePost } from "../../../constants/common_interfaces";

const ProfileRescueCard: React.FC<{ post: RescuePost }> = ({ post }) => {
  return (
    <div className="p-4 shadow-lg rounded-lg bg-white md:w-full w-fit flex flex-col md:flex-row justify-center gap-4">
      <div>
        <img
          className="h-fit object-cover rounded-md"
          src={post?.rescuePostImage || "https://via.placeholder.com/150"}
        />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="font-semibold text-2xl"> {post.title}</div>
        <div className="text-zince-500 truncate"> {post.description}</div>
      </div>
    </div>
  );
};

export default ProfileRescueCard;