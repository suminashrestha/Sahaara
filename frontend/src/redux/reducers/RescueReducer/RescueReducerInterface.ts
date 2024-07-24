export default interface RescueReducerInterface {
  isLoading: boolean;
  error?: string | null;
  posts: RescuePostSchema[];
  post : RescuePostSchema | null
}

export interface RescuePostSchema {
  _id: string;
  title?: string;
  comments?: {
    name: string;
    commenter: string;
    comment: string;
    _id: string;
  }[];
  description?: string;
  likes?: { user: string; _id: string }[];
  location?: { lng: string; lat: string };
  rescuePostAuthor?: { _id: string; username: string; type: string };
  rescuePostImage?: string;
  createdAt: string
}