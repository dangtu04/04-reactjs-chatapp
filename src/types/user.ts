export interface User {
  _id: string;
  name: string;
  email: string;
  // address: string;
  // role: string;
  avatarUrl?: string;
  isActive: boolean;
}

export interface Friend {
  _id: string;
  name: string;
  avatarUrl?: string;
}

export interface FriendRequest {
  id: string;
  name: string;
  avatarUrl?: string;
}