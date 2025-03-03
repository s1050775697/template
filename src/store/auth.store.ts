import { IUser } from "@/typescript/interfaces/authentication.interface";
import { GET_ITEM, SAVE_ITEM } from "@/utils/storage";
import { create } from "zustand";

export type IAuthStore = {
  user: IUser | null | undefined;
  loginUser: (user: IUser) => void;
  logoutUser: () => void;
  setUser: (user: any) => void;
};

// const useAuthStore = create<IAuthStore>((set) => ({
//   user: GET_ITEM("user") as IUser,
//   loginUser: (user) => set({ user }),
//   logoutUser: () => set({ user: null }),
//   setUser: (user) => set({ user }),
// }));

const useAuthStore = create<IAuthStore>((set) => ({
  user: GET_ITEM("user") as IUser,
  loginUser: (user) => {
    SAVE_ITEM("user", user);
    set({ user });
  },
  logoutUser: () => {
    set({ user: null });
  },
  setUser: (user) => {
    SAVE_ITEM("user", user);
    set({ user });
  },
}));

export default useAuthStore;
