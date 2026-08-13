import { create } from "zustand";
import { ALLOWED_USERS } from "@/constants/users";

interface AppState {
  currentUser: (typeof ALLOWED_USERS)[0] | null;
  coins: number;
  stamina: number;
  login: (id: string, pw: string) => boolean;
  logout: () => void;
  updateCoins: (amount: number) => void;
  useStamina: (amount: number) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: ALLOWED_USERS[0], // 기본 유저
  coins: 1000,
  stamina: 10,
  login: (id, pw) => {
    const user = ALLOWED_USERS.find((u) => u.id === id && u.password === pw);
    if (user) {
      set({ currentUser: user });
      return true;
    }
    return false;
  },
  logout: () => set({ currentUser: null }),
  updateCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  useStamina: (amount) => {
    const { stamina } = get();
    if (stamina >= amount) {
      set({ stamina: stamina - amount });
      return true;
    }
    return false;
  },
}));
