import { MdOutlineDeleteOutline } from "react-icons/md";
import Popover from "../../../components/Popover";
import { RescuePost } from "../../../constants/common_interfaces";
import { SlOptionsVertical } from "react-icons/sl";

const ProfileRescueCard: React.FC<{
  post: RescuePost;
  deletePost: (arg: string) => void;
}> = ({ post, deletePost }) => {
  return (
    <div className="p-4 shadow-lg rounded-lg bg-white md:w-full w-fit flex md:flex-row justify-center gap-4">
      <div className="flex-shrink-0">
        <img
          className="h-full w-full max-h-48 object-cover rounded-md"
          src={post?.rescuePostImage || "https://via.placeholder.com/150"}
          alt={post?.title || "Rescue post image"}
        />
      </div>
      <div className="flex flex-col justify-center gap-4 overflow-y-auto">
        <div className="font-semibold text-2xl">
          {post?.title || "No title"}
        </div>
        <p className="text-zinc-500  w-full truncate">
          {post?.description || "No description available"}
        </p>
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

export default ProfileRescueCard;