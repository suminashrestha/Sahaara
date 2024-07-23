import { FaFilter } from "react-icons/fa";
import UserNav from "../components/UserNav";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect, useState } from "react";
import { getAllAdoptionPosts } from "../redux/actions/adoptionActions";
import { toast } from "react-toastify";
import DisplayCards from "../components/AdoptionPost/DisplayCards";
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
    if (error) toast(error);
  }, [error]);

  if (isLoading) {
    return <Loader/>;
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
      <div className="mt-20 p-10 bg-slate-100 flex flex-col">
        <div className="flex">
          <label htmlFor="filter">
            <FaFilter size={25} />
          </label>
          <select id="filter" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-13 mx-auto">
            
            {sortedPosts.map((post) => (
              <DisplayCards post={post as AdoptionPostSchema} key={post._id} />
            ))}
          </div>
        </div>
      </div>

  );
};

export default ViewAdoptionPost;
