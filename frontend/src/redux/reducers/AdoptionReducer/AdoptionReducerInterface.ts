export default interface AdoptionReducerInterface {
  isLoading: boolean;
  error?: string | null;
  posts: AdoptionPostSchema[];
  post?: AdoptionPostSchema | null;
}

export interface AdoptionPostSchema {
  _id: string;
  name: string;
  age: string;
  breed: string;
  gender: string;
  size: string;
  color: string;
  coatLength: string;
  characterstics: string[];
  health: string[];
  contact: {
    email: string;
    phone: string;
    name: string;
    address: string;
  };
  myStory: string;
  category: string;
  adoptionImage?: string;
  createdAt: string;
  adoptionPostImage?: File | null;
}

