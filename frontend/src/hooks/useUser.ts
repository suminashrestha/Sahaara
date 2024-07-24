import { useAppSelector } from "./useRedux";

const useUser = () => {
  const user = useAppSelector((state) => state.authentication.user);
  return user;
};

export default useUser;