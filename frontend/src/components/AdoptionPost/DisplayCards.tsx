// import React from "react";
// import Button from "../Button";
// import { Link } from "react-router-dom";
import { AdoptionPostSchema } from "../../redux/reducers/AdoptionReducer/AdoptionReducerInterface";

// Define the props type for the DisplayCards component
interface DisplayCardsProps {
  post: AdoptionPostSchema;
}

// const DisplayCards: React.FC<DisplayCardsProps> = ({ post }) => {
//   return (
//     <div className="rounded-lg shadow-md p-5">
//       <img
//         src={post.adoptionImage}
//         alt={post.title}
//         className="w-full h-65 object-cover"
//       />
//       <div className="flex flex-col gap-3 p-4">
//         <h3 className="text-lg font-bold">{post.title}</h3>
//         <p className="text-sm">{post.description}</p>
//         <p className="text-sm">Category: {post.category}</p>
//         <p className="text-sm">Location: {post.location}</p>
//         <p className="text-sm">Created at: {new Date(post.createdAt).toLocaleDateString()}</p> {/* Format date if needed */}
//         <p className="text-sm">Posted by: {post.authorUserName}</p>
//         <Button>
//           <Link to={`/viewadoption/${post._id}`}>View more...</Link>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default DisplayCards;

const DisplayCards: React.FC<DisplayCardsProps> = ({ post }) => {
  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-64 object-cover"
        src="/aboutus2.jpg"
        alt="Pet Name"
      />
      <div className="p-4 text-center">
        //eta gender
        <h2 className="text-2xl font-bold mb-2">Pet Name</h2>
        <div className="flex justify-center space-x-2">
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
            Large
          </span>
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
            Adult
          </span>
        </div>
      </div>
    </div>
  );
};

export default DisplayCards;
