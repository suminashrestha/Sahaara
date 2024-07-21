import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import Button from "../Button";
import { RescuePostSchema } from "../../redux/reducers/RescueReducer/RescueReducerInterface";
import API from "../../config/baseUrl";

interface RescueCardProps {
  post: {
    authorUserName: string;
    title: string;
    description: string;
    rescuePostImage?: string;
    likes: Array<any>;
    comments: Array<any>;
  };
}

const RescueCard: React.FC<RescueCardProps> = ({ post }) => {
  const [isLiked, setIsliked] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const handleLike = async() => {
    // setIsliked((isLiked) => !isLiked);

    try{
      const response = await API.put(`/api/v1/rescue-posts/${post._id}/like`)
      console.log(response)
    }catch(e){
      console.log("hello bello cello")
    }
  };

  const handleComment = () => {
    setOpenComment((openComment) => !openComment);
  };

  return (
    <div className="flex flex-col w-full shadow-md rounded-lg bg-white overflow-y-auto text-zinc-600">
      <div className="h-[60px] w-full flex items-center px-4 gap-4">
        <div className="rounded-[50%] bg-black w-11 h-11 text-white flex justify-center items-center">
          {post.authorUserName.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <h3 className="text-md">{post?.authorUserName}</h3>
          <h3 className="text-sm"> eta chai date </h3>
        </div>
      </div>
      <div className="p-2 flex flex-col">
        <h2 className="font-bold">{post?.title}</h2>
        <p>{post?.description}</p>
      </div>
      <div className="h-[360px] w-full flex items-center justify-center">
        {post.rescuePostImage && (
          <img
            src={post.rescuePostImage}
            alt=""
            className="h-[100%] w-[100%]"
          />
        )}
      </div>
      <div className="h-[30px] w-full flex px-5 gap-4 border-b-2 justify-between">
        <h3>{post?.likes.length} likes</h3>
        <h3>{post?.comments.length} comments</h3>
      </div>
      <div className="h-[50px] w-full flex items-center border-b-2">
        <button
          className="w-[50%] text-center flex justify-center gap-2 items-center hover:bg-slate-100"
          onClick={handleLike}
        >
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          Like
        </button>
        <button
          className="w-[50%] text-center flex justify-center gap-2 items-center  hover:bg-slate-100"
          onClick={handleComment}
        >
          <FaRegComment />
          Comment
        </button>
      </div>
      {openComment ? (
        <div className="h-[300px] p-4">
          <form className="flex gap-6">
            <input
              type="text"
              className="bg-slate-100 w-[70%] rounded-lg p-3 focus:outline-none"
              placeholder="Add a comment"
            />
            <Button>Comment</Button>
          </form>
          comments appear here
        </div>
      ) : null}
    </div>
  );
};

export default RescueCard;
