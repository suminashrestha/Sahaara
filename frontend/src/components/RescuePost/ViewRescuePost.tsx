import { useEffect } from "react";
import RescueCard from "./RescueCard";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getAllRescuePosts } from "../../redux/actions/rescueActions";
import Loader from "../Loader";
import { toast } from "react-toastify";

function ViewRescuePost() {
  const dispatch = useAppDispatch();
  const { isLoading, error, posts } = useAppSelector(
    (state) => state.rescuePost
  );

  useEffect(() => {
    dispatch(getAllRescuePosts());
  }, [dispatch]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-7">
      {posts &&
        Array.isArray(posts) &&
        posts.length != 0 &&
        posts.map((post) => <RescueCard post={post} key={post._id} />)}
    </div>
  );
}

export default ViewRescuePost;