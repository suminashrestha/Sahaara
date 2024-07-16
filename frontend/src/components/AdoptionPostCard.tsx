import React from "react";

interface AdoptionPostCardProps {
  post: {
    _id: string;
    title: string;
    description: string;
    location?: string;
    category?: string;
    adoptionPostImage?: string;
  };
}

const AdoptionPostCard: React.FC<AdoptionPostCardProps> = ({ post }) => {
  return (
    <div className="card">
      <img
        src={post.adoptionPostImage}
        alt={post.title}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.description}</p>
        {post.location && (
          <p className="card-text">Location: {post.location}</p>
        )}
        {post.category && (
          <p className="card-text">Category: {post.category}</p>
        )}
      </div>
    </div>
  );
};

export default AdoptionPostCard;
