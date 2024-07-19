import React, { useEffect, useState } from "react";
import API from "../../config/baseUrl";
import DisplayCards from "./DisplayCards";

const AdoptDog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchDogPosts = async () => {
      try {
        const response = await API.get("/api/v1/adoption-posts?category=dog");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch dog adoption posts", error);
      }
    };

    fetchDogPosts();
  }, []);

  return (
    <div className="adopt-dog">
      {/* {posts.map((post) => (
        <DisplayCards key={post._id} post={post} />
      ))} */}{" "}
      <h1>Dog POsts</h1>
    </div>
  );
};

export default AdoptDog;
