import UserNav from "../components/UserNav";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect, useState } from "react";
import { getAllAdoptionPosts } from "../redux/actions/adoptionActions";
import { toast } from "react-toastify";
import DisplayCard from "../components/AdoptionPost/DisplayCard";
import { AdoptionPostSchema } from "../redux/reducers/AdoptionReducer/AdoptionReducerInterface";
import Loader from "../components/Loader";
const ViewAdoptionPost = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, posts } = useAppSelector(
    (state) => state.adoptionPost
  );
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllAdoptionPosts());
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

  let sortedPosts: AdoptionPostSchema[] = [];

  if (filter === "all") sortedPosts = posts;
  if (filter === "cat")
    sortedPosts = posts.filter((post) => post.category === "cat");
  if (filter === "dog")
    sortedPosts = posts.filter((post) => post.category === "dog");

  return (
    <div>
      <UserNav />
      <div className="mt-20 bg-gray-100 flex flex-col">
        <div className="flex items-center justify-between px-5">
          <div className="text-zinc-600">
            {sortedPosts.length} matching animals found
          </div>
          <div className="h-[10vh] flex justify-end items-center p-5 gap-5">
            <label htmlFor="filter" className="text-zinc-600">
              Select animal type
            </label>
            <select
              id="filter"
              onChange={(e) => setFilter(e.target.value)}
              className="w-[150px] h-[40px] rounded-lg"
            >
              <option value="all">All</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
            </select>
          </div>
        </div>
        <div className="flex h-full w-full justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-13 mx-auto w-[95%] p-7">
            {sortedPosts.map((post) => (
              <DisplayCard post={post as AdoptionPostSchema} key={post._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdoptionPost;
