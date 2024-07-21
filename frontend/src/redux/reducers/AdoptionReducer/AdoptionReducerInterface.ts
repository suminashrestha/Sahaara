export default interface AdoptionReducerInterface {
  isLoading: boolean;
  error?: string | null;
  posts: AdoptionPostSchema[];
  post?: AdoptionPostSchema | null;
}

export interface AdoptionPostSchema {
  _id: string;
  title: string;
  description: string;
  category: string;
  adoptionImage?: string;
  location?: string;
  authorUserName: string;
  createdAt: string;
}
