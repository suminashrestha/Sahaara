export default interface VolunteerReducerInterface {
    isLoading: boolean;
    error?: string | null;
    success?: boolean;
    posts: VolunteerPostSchema[];
  }
  
  export interface VolunteerPostSchema {
    _id: string;
    user: { username: string };
    title: string;
    location?: string;
    date?: Date;
    eventTime?: string;
  }