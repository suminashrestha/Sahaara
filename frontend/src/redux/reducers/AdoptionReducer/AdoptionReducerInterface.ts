export default interface AdoptionReducerInterface {
  isLoading: boolean;
  error?: string | null;
  posts: Post[];
  post?: Post | null;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  category: string;
  postImage?: string;
  location?: string;
}
