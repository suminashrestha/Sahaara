export interface UserProfile {
    _id: string;
    location?: string;
    name?: string;
    profilePicture?: string;
    user?: {
      _id: string;
      email: string;
      isVolunteer?: boolean;
      type: string;
      username: string;
    };
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface RescuePost {
    _id: string;
    title?: string;
    description?: string;
    rescuePostImage?: string;
  }
  
  export interface AdoptionPost {
    _id: string;
    name: string;
    age: string;
    category: string;
    adoptionPostImage?: string;
  }