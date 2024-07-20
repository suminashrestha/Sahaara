export default interface RescueReducerInterface {
  isLoading: boolean;
  error?: string | null;
  posts: Post[];
}

interface Post {
  _id: string;
  authorUserName: string;
  title: string;
  description: string;
  rescuePostImage?: string;
  location?: {
    lat: number;
    lng: number;
  };
  comments: { username: string; content: string }[];
  likes: { username: string }[];
}
