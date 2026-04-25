export interface UserProfile {
  portfolioLink: string;
  patronymic: string;
  surname: string;
  name: string;
  telegramLink: string;
  description: string;
  id: string;
  fullName: string;
  age: number;
  direction: number;
  course?: string;
  avatarUrl?: string;
  website?: string;
  username: string;
  email: string;
  phone?: string;
  about?: string;
  techStack?: string[];
  birthDate?: string;
  university?: string;
  faculty?: string;
  graduationYear?: number;
  skills?: string[];
  experience?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    telegram?: string;
  };
}
export interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  fetchUserProfile: (userId: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}
export interface IUpdateUser {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  surname?: string;
  patronymic?: string;
  description?: string;
  telegramLink?: string;
  portfolioLink?: string;
  isSubscribedToNotifications?: boolean;
  age?: number;
  direction?: number;
  course?: number;
  skills?: string[];
  userRole?: number;
  avatarUrl?: string;
}
