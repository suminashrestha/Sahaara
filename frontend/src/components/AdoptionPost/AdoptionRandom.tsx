import React, { useEffect, useState } from "react";
import API from "../../config/baseUrl";
import DisplayCards from "./DisplayCards";
import { AdoptionPost } from "../../types/AdoptionPost";

const AdoptionRandom: React.FC = () => {
  const [posts, setPosts] = useState<AdoptionPost[]>([]);

  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const response = await API.get("/api/v1/adoption-posts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch random adoption posts", error);
      }
    };

    fetchRandomPosts();
  }, []);

  return (
    <div className="mt-20 p-2">
      {posts.map((post) => (
        <DisplayCards key={post._id} post={post} />
      ))}
    </div>
  );
};

export default AdoptionRandom;
