import { useNavigate, useParams } from "react-router";
import UserNav from "../UserNav";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getSingleAdoptionPost } from "../../redux/actions/adoptionActions";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { IoArrowBackCircle } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import moment from "moment";
import AdoptionForm from "./AdoptionForm";

const SingleAdoptionPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const { post, isLoading, error } = useAppSelector(
    (state) => state.adoptionPost
  );

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getSingleAdoptionPost(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <UserNav />
      <div className="mt-20 w-screen h-[90vh] flex p-7 flex-col">
        <div className="h-[10vh] flex items-center p-5 justify-between">
          <div className="flex items-center gap-5">
            <IoArrowBackCircle size={50} onClick={() => navigate(-1)} />
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl">{post?.name.toUpperCase()}</h1>
              <div className="flex gap-1">
                <CiLocationOn size={20} />
                <p className="text-sm text-zinc-600">{post?.contact.address}</p>
              </div>
            </div>
          </div>
          <h1 className="flex items-center gap-3">
            {" "}
            <CiClock2 size={20} />
            posted {moment(post?.createdAt).fromNow()}
          </h1>
        </div>
        <div className="w-full h-[80%] flex p-5 gap-9">
          <img
            src={post?.adoptionPostImage}
            alt=""
            className="w-[40%] h-full shadow-lg"
          />

          <table className="w-1/4 border-collapse bg-white shadow-lg rounded-lg">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-4 bg-gray-50 text-teal-800">
                  Breed
                </td>
                <td className="p-4 text-gray-700 font-bold">{post?.breed}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-4 bg-gray-50 text-teal-800">
                  Color
                </td>
                <td className="p-4 text-gray-700 font-bold">{post?.color}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-4 bg-gray-50 text-teal-800">
                  Age
                </td>
                <td className="p-4 text-gray-700 font-bold">{post?.age}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-4 bg-gray-50 text-teal-800">
                  Gender
                </td>
                <td className="p-4 text-gray-700">
                  <img
                    src={`${
                      post?.gender === "male" ? "/male.png" : "/female.png"
                    }`}
                    alt=""
                    className="h-[25px] w-[25px]"
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-4 bg-gray-50 text-teal-800">
                  Size
                </td>
                <td className="p-4 text-gray-700 font-bold">{post?.size}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="font-semibold p-4 bg-gray-50 text-teal-800">
                  Coat Length
                </td>
                <td className="p-4 text-gray-700 font-bold">
                  {post?.coatLength}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-screen w-full bg-gray-200 flex p-9 gap-5 items-center">
        <div className="flex flex-col w-[60%] h-full gap-5 text-zinc-600 justify-center ">
          <div className="bg-white h-[40%] w-full rounded-lg p-5 overflow-y-auto flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">My Story</h2>
            <p className="text-zinc-500 text-md">{post?.myStory}</p>
            <p className="text-zinc-500 text-md font-semibold">
              Health: {post?.health}
            </p>
          </div>
          <div className="bg-white h-1/4 w-full rounded-lg overflow-y-auto flex flex-col gap-5 p-5">
            <h2 className="text-2xl font-semibold">Key features</h2>
            <ul className="grid grid-cols-2 h-full overflow-y-auto">
              {post?.characterstics.map((character) => (
                <li className="flex items-center gap-3">
                  <GiCheckMark />
                  {character}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <AdoptionForm email={post?.contact.email} phone={post?.contact.phone} address={post?.contact.address} name={post?.contact.name}/>
      </div>
    </div>
  );
};

export default SingleAdoptionPost;
