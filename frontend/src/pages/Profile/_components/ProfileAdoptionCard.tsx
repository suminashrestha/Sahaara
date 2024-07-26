import { MdOutlineDeleteOutline } from "react-icons/md";
import Popover from "../../../components/Popover";
import { AdoptionPost } from "../../../constants/common_interfaces";
import { SlOptionsVertical } from "react-icons/sl";

const ProfileAdoptionCard: React.FC<{
  post: AdoptionPost;
  deletePost: (arg: string) => void;
}> = ({ post, deletePost }) => {
  return (
    <div className="p-4 shadow-lg rounded-lg bg-white md:w-full w-fit flex md:flex-row justify-center gap-4">
      <div>
        <img
          className="h-full w-full max-h-48 object-cover rounded-md"
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

      <div>
        <Popover
          content={[
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                deletePost(post._id);
              }}
            >
              delete <MdOutlineDeleteOutline size={20} />
            </div>,
          ]}
        >
          <SlOptionsVertical size={10} />
        </Popover>
      </div>
    </div>
  );
};

export default ProfileAdoptionCard;
