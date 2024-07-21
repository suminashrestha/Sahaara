export default interface RescueReducerInterface {
  isLoading: boolean;
  error?: string | null;
  posts: RescuePostSchema[];
}

export interface RescuePostSchema {
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
