import create from "zustand";

interface User {
  user_id: string;
  email: string;
}

interface AppState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  getUserId: () => string | null;
}

export const useStore = create<AppState>((set, get) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
  getUserId: () => {
    const user = get().user;
    return user ? user.user_id : null;
  },
}));
