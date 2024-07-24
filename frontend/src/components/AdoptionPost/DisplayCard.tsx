import { AdoptionPostSchema } from "../../redux/reducers/AdoptionReducer/AdoptionReducerInterface";
import { CiLocationOn } from "react-icons/ci";
import Button from "../Button";
import moment from "moment";
import { useNavigate } from "react-router";

interface DisplayCardsProps {
  post: AdoptionPostSchema;
}

const DisplayCard: React.FC<DisplayCardsProps> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[290px] rounded-lg h-[480px] shadow-lg bg-white p-3">
      <img
        className="w-full h-[50%] object-cover rounded-md"
        src={`${
          post.adoptionPostImage
            ? post.adoptionPostImage
            : "/optionalPostImage.png"
        }`}
        alt="Pet image"
      />
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <h2 className="text-xl font-semibold mb-2 text-zinc-600">
              {post.name}
            </h2>
            <img
              src={`${post.gender === "male" ? "male.png" : "female.png"}`}
              alt=""
              className="h-[25px] w-[25px]"
            />
          </div>
          <h2>{post.age} years old</h2>
        </div>
        <div className="flex gap-1">
          <CiLocationOn size={20} />
          <p className="text-sm">{post.contact.address}</p>
        </div>
        <div className="flex space-x-4">
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
            {post.size}
          </span>
          <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
            {post.breed}
          </span>
        </div>
        <div className="text-sm flex gap-6 text-gray-500">
          <p>Ad posted |</p>
          {moment(post.createdAt).fromNow()}
        </div>
        <Button onClick={() => navigate(`/viewadoption/${post._id}`)}>View more...</Button>
      </div>
    </div>
  );
};

export default DisplayCard;
