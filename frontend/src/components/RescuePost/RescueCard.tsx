import { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Button from "../Button";
import API from "../../config/baseUrl";
import { toast } from "react-toastify";
import Popover from "../Popover";
import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { addComment, deleteComment } from "../../redux/actions/rescueActions";
import { CgSpinner } from "react-icons/cg";
import useUser from "../../hooks/useUser";
import { ActionTypes } from "../../constants/action_types";
import { useNavigate } from "react-router";
import moment from "moment";

interface IComment {
  _id?: string;
  name?: string;
  commenter?: string;
  comment?: string;
}

export interface RescuePostProps {
  post: {
    _id: string;
    title?: string;
    comments?: IComment[];
    description?: string;
    likes?: { user: string; _id: string }[];
    location?: { lng: string; lat: string };
    rescuePostAuthor?: { _id: string; username: string; type: string };
    rescuePostImage?: string;
    createdAt: string;
  };
}

const RescueCard: React.FC<RescuePostProps> = ({ post }) => {
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLiked, setIsliked] = useState(() => {
    const bool = post?.likes?.some((l) => l?.user === user?._id);
    return bool;
  });
  const [openComment, setOpenComment] = useState(false);

  const handleLike = async () => {
    let url;
    if (isLiked) {
      url = `/api/v1/rescue-posts/${post._id}/remove-like`;
    } else {
      url = `/api/v1/rescue-posts/${post._id}/like`;
    }

    try {
      const { data } = await API.put(url);
      dispatch({
        type: ActionTypes.LIKE_SUCCESS,
        payload: {
          postId: post._id,
          updatedLikes: data.data.likes,
        },
      });
      setIsliked((prev) => !prev);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch({
        type: ActionTypes.LIKE_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

  const handleComment = () => {
    setOpenComment((openComment) => !openComment);
  };

  return (
    <div className="flex flex-col w-full shadow-md rounded-lg bg-white overflow-y-auto text-zinc-600">
      <div className="h-[60px] w-full flex items-center px-4 gap-4">
        <div className="rounded-full bg-black w-11 h-11 text-white flex justify-center items-center">
          {post.rescuePostAuthor?.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <h3
            className="text-md hover:underline cursor-pointer"
            onClick={() => {
              navigate(`/userprofile/${post.rescuePostAuthor?._id}`);
            }}
          >
            {post?.rescuePostAuthor?.username}
          </h3>
          <h3 className="text-sm">{moment(post.createdAt).fromNow()}</h3>
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
        <h3>{post?.likes?.length} likes</h3>
        <h3
          onClick={() => setOpenComment(true)}
          className="hover:underline cursor-pointer"
        >
          {post.comments?.length} comments
        </h3>
      </div>
      <div className="h-[50px] w-full flex items-center border-b-2">
        <button
          className="w-1/2 text-center flex justify-center gap-2 items-center hover:bg-slate-100"
          onClick={handleLike}
        >
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          Like
        </button>
        <button
          className="w-1/2 text-center flex justify-center gap-2 items-center  hover:bg-slate-100"
          onClick={handleComment}
        >
          <FaRegComment />
          Comment
        </button>
      </div>
      {openComment ? (
        <CommentSection postId={post._id} comments={post.comments} />
      ) : null}
    </div>
  );
};

const CommentSection = ({
  postId,
  comments,
}: {
  postId: string;
  comments?: IComment[];
}) => {
  const [comment, setComment] = useState("");

  const { isLoading, error } = useAppSelector((state) => state.rescuePost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bg-slate-100 w-3/4 rounded-lg px-2 focus:outline-none text-black"
          placeholder="say something"
        />
        <Button
          className="w-1/3"
          onClick={() => {
            if (!comment) {
              toast.error("Please add something to comment");
              return;
            }
            dispatch(addComment(postId, comment));
            setComment("");
          }}
        >
          Comment
          {isLoading && <CgSpinner className="inline ml-1" size={24} />}
        </Button>
      </div>
      {comments && comments.length !== 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="p-4 flex">
            <span className="rounded-full bg-black w-8 h-8 text-white flex justify-center items-center">
              {comment.name?.charAt(0).toUpperCase()}
            </span>
            <div className="ml-2 mt-1 bg-zinc-500 text-white rounded-xl rounded-tl-none px-3 py-1 w-96 shrink-1">
              <div className="flex justify-between">
                <div className="text-lg font-semibold hover:underline cursor-pointer">
                  {comment.name}
                </div>
                <div>
                  <Popover
                    content={[
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          dispatch(
                            deleteComment(postId, comment._id as string)
                          );
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
              <div className="text-sm">{comment.comment}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-slate-600 flex justify-center items-center gap-1">
          <span className="bg-red-500 text-white px-2 py-1 rounded-md ">
            SORRY !!!
          </span>{" "}
          No Comments available at the moment.
        </div>
      )}
    </div>
  );
};

export default RescueCard;
