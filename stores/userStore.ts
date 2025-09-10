import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  isOnline: boolean;
}

interface UserState {
  user: User | null;
  friends: User[];
  setUser: (user: User) => void;
  addFriend: (friend: User) => void;
  removeFriend: (friendId: string) => void;
  updateUserStatus: (isOnline: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  friends: [],

  setUser: (user) => set({ user }),

  addFriend: (friend) =>
    set((state) => ({
      friends: [...state.friends, friend],
    })),

  removeFriend: (friendId) =>
    set((state) => ({
      friends: state.friends.filter((friend) => friend.id !== friendId),
    })),

  updateUserStatus: (isOnline) =>
    set((state) => ({
      user: state.user ? { ...state.user, isOnline } : null,
    })),
}));
