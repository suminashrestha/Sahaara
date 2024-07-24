import { useNavigate } from "react-router-dom";
import UserNav from "../components/UserNav";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { format } from "date-fns";
import { ActionTypes } from "../constants/action_types";
import API from "../config/baseUrl";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";

interface IVolunteerPost {
  user: { username: string };
  title: string;
  location?: string;
  date?: Date;
  eventTime?: string;
}

const formatEventTime = (eventTime: string) => {
  const [hoursStr, minutesStr] = eventTime.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const ViewVolunteer = () => {
  const user = useUser();
  const { isLoading, posts, error } = useAppSelector(
    (state) => state.volunteerPost
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type !== "individual") {
      navigate("/profile/rescue", { replace: true });
    }
    if (!user?.isVolunteer) {
      navigate("/profile/rescue", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    async function getPosts() {
      dispatch({
        type: ActionTypes.GET_ALL_VOLUNTEER_POSTS_REQUEST,
      });
      try {
        const { data } = await API.get("/api/v1/volunteer-posts");
        console.log("data", data);
        dispatch({
          type: ActionTypes.GET_ALL_VOLUNTEER_POSTS_SUCCESS,
          payload: {
            posts: data.data,
            message: data.message,
          },
        });
      } catch (error: any) {
        navigate("/profile/rescue");
        dispatch({
          type: ActionTypes.GET_ALL_VOLUNTEER_POSTS_FAILURE,
          payload: {
            error: error.response.data.message,
          },
        });
      }
    }
    getPosts();
  }, []);

  return (
    <>
      <UserNav />
      {isLoading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-20 grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 p-8">
          {posts &&
            posts.map((post, index) => (
              <VolunteerPostCard post={post} key={index + 1} />
            ))}
        </div>
      )}
    </>
  );
};

const VolunteerPostCard: React.FC<{ post: IVolunteerPost }> = ({ post }) => {
  const { title, location, date, eventTime, user } = post;

  const formattedDate = date ? format(new Date(date), "yyyy-MM-dd") : "N/A";
  const formattedEventTime = eventTime ? formatEventTime(eventTime) : "N/A";

  return (
    <div className="shadow-lg rounded-lg overflow-">
      <div className="p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700 ">
          <span className="font-semibold">Location:</span> {location || "N/A"}
        </p>
        <p className="text-gray-700 ">
          <span className="font-semibold">Date:</span> {formattedDate}
        </p>
        <p className="text-gray-700 ">
          <span className="font-semibold">Event Time:</span>{" "}
          {formattedEventTime}
        </p>
        <p className="text-end font-semibold">
          Organized By{" "}
          <span className="font-bold underline">{user.username}</span>
        </p>
      </div>
    </div>
  );
};

export default ViewVolunteer;