import { AdoptionPost } from "../../../constants/common_interfaces";

const ProfileAdoptionCard: React.FC<{ post: AdoptionPost }> = ({ post }) => {
  return (
    <div className="p-4 shadow-lg rounded-lg bg-white md:w-full w-fit flex flex-col md:flex-row justify-center gap-4">
      <div>
        <img
          className="h-fit object-cover rounded-md"
          src={post?.adoptionPostImage || "https://via.placeholder.com/150"}
        />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div>Name : {post.name}</div>
        <div>Age : {post.age}</div>
        <div>
          Category :
          <span className="bg-stone-500 px-3 py-1 rounded-md ml-1 text-white">
            {post.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdoptionCard;