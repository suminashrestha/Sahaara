import Button from "../Button";
import { AdoptionPost } from "../../types/AdoptionPost";
interface DisplayCards {
  post: AdoptionPost;
}
const DisplayCards: React.FC<DisplayCards> = ({ post }) => {
  return (
    <div className="border-red-400">
      <img
        src={post.adoptionPostImage}
        alt={post.title}
        className="h-11 w-10"
      />
      <div className="border-black-400">
        <h2 className="p-4">{post.title}</h2>
        <p className="p-2">{post.description}</p>
        <p className="p-2">Location: {post.location}</p>
        <p className="p-2">Posted by: {post.adoptionPostAuthor}</p>
        <Button className="p-3">Adopt me</Button>
      </div>
    </div>
  );
};

export default DisplayCards;
