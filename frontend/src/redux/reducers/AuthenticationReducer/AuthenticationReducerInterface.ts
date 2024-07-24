export default interface AuthenticationReducerInterface {
  isLoading: boolean;
  user?: User | null;
  token?: string | null;
  isLoginSuccessful?: boolean;
  error?: string | null;
}

interface User {
  _id: string;
  email: string;
  type: string;
  username: string;
  isVolunteer?: boolean;
}