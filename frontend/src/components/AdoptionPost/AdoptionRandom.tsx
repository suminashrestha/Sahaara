import React from "react";
import DisplayCards from "./DisplayCards";

const AdoptionRandom: React.FC = () => {
  const dummyPosts = [
    {
      adoptionImage: "https://via.placeholder.com/150",
      title: "Lovely Cat",
      description: "A lovely cat looking for a home.",
      location: "New York",
      author: "John Doe",
    },
    {
      adoptionImage: "https://via.placeholder.com/150",
      title: "Friendly Dog",
      description: "A friendly dog looking for a home.",
      location: "Los Angeles",
      author: "Jane Smith",
    },
    {
      adoptionImage: "https://via.placeholder.com/150",
      title: "Friendly Dog",
      description: "A friendly dog looking for a home.",
      location: "Los Angeles",
      author: "Jane Smith",
    },
    {
      adoptionImage: "https://via.placeholder.com/150",
      title: "Friendly Dog",
      description: "A friendly dog looking for a home.",
      location: "Los Angeles",
      author: "Jane Smith",
    },
    {
      adoptionImage: "https://via.placeholder.com/150",
      title: "Friendly Dog",
      description: "A friendly dog looking for a home.",
      location: "Los Angeles",
      author: "Jane Smith",
    }
  ];

  return <DisplayCards posts={dummyPosts} />;
};

export default AdoptionRandom;