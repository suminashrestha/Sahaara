import { useEffect } from "react";
import { useParams } from "react-router";
import { getSingleRescuePost } from "../../redux/actions/rescueActions";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import Loader from "../Loader";
import { toast } from "react-toastify";
import RescueCard from "./RescueCard";

function SingleRescuePost() {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const { post, error, isLoading } = useAppSelector(
    (state) => state.rescuePost
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleRescuePost(id));
    }
  }, [dispatch, id]);

  if (isLoading) <Loader />;

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div>
        {
            post && 
            <RescueCard post={post} />
        }
    </div>
  );
}

export default SingleRescuePost;
