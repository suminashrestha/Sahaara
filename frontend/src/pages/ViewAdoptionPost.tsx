import React, { useEffect, useState } from "react";
import axios from "axios";
import AdoptionPostCard from "../components/AdoptionPostCard";
import UserNav from "../components/UserNav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdoptionPost {
  adoptionPostAuthor: string;
  title: string;
  description: string;
  location?: string;
  category?: string;
  adoptionPostImage?: string;
}

const ViewAdoptionPost = () => {
  const [posts, setPosts] = useState<AdoptionPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/v1/adoption-posts");
        setPosts(response.data);
      } catch (error) {
        toast.error("Failed to fetch adoption posts.");
      }
    };

    fetchPosts();
  }, []);

  const handleFilter = async () => {
    try {
      const response = await axios.post("/api/v1/adoption-posts/classify");
      toast.success("Images classified successfully!");
      setPosts(response.data);
    } catch (error) {
      toast.error("Failed to classify images.");
    }
  };

  return (
    <div>
      <UserNav />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Pets for Adoption</h1>
          <button className="btn btn-primary" onClick={handleFilter}>
            Filter
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <AdoptionPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAdoptionPost;
