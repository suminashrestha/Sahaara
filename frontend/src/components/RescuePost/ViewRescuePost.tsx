import { useEffect } from "react";
import RescueCard from "./RescueCard";
import API from "../../config/baseUrl";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getAllRescuePosts } from "../../redux/actions/rescueActions";
import { toast } from "react-toastify";

function ViewRescuePost() {
  const dispatch = useAppDispatch();
  const { isLoading, error, posts } = useAppSelector(
    (state) => state.rescuePost
  );

  useEffect(() => {
    dispatch(getAllRescuePosts());
  }, [dispatch]);

  useEffect(()=>{
    console.log(posts)
  },[posts])

  useEffect(() => {
    if (error) toast(error);
  }, [error]);

  if (isLoading) {
    return <h1 className="text-6xl">loading.....</h1>;
  }

  return (
    <div className="flex flex-col gap-7">
      {posts &&
        posts.length != 0 &&
        posts.map((post) => <RescueCard post={post} key={post._id} />)}
    </div>
  );
}

export default ViewRescuePost;
