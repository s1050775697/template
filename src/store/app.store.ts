import { create } from "zustand";

export type IAppStore = {
  isSidebarToggled: boolean;
  toggleSidebar: (isSidebarToggled: boolean) => void;
};

const useAppStore = create<IAppStore>((set) => ({
  isSidebarToggled: false,
  toggleSidebar: (isSidebarToggled) => set({ isSidebarToggled }),
}));

export default useAppStore;
