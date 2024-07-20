import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface Post {
  adoptionImage: string;
  title: string;
  description: string;
  location: string;
  author: string;
}

interface DisplayCardsProps {
  posts: Post[];
}

const DisplayCards: React.FC<DisplayCardsProps> = ({ posts }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 ">
      {posts.map((post, index) => (
        <div key={index} className="rounded-lg shadow-md p-5">
          <img
            src={post.adoptionImage}
            alt={post.title}
            className="w-full h-65 object-cover"
          />
          <div className="flex flex-col gap-3 p-4">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm">{post.description}</p>
            <p className="text-sm">Location: {post.location}</p>
            <p className="text-sm">Posted by: {post.author}</p>
            <Button>
              <Link to={`/viewadoption/${post._id}`}>View more...</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayCards;