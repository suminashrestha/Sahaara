import { useEffect, useState } from "react";
import API from "../../config/baseUrl";
import DisplayCards from "./DisplayCards";

const AdoptCat = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchCatPosts = async () => {
      try {
        const response = await API.get("/api/v1/adoption-posts?category=cat");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch cat adoption posts", error);
      }
    };

    fetchCatPosts();
  }, []);

  return (
    <div className="mt-20">
      {/* {posts.map((post) => (
        <DisplayCards key={post._id} post={post} />
      ))} */}
      <h1>Cat POsts</h1>
    </div>
  );
};

export default AdoptCat;
