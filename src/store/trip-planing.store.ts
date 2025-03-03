import { create } from "zustand";

export type ITripPlanningStore = {
  startDate: string;
  endDate: string;
  travelers: number | undefined;
  budgetMin: number | undefined;
  budgetMax: number | undefined;
  isDataAvailableFromPlanJourney: boolean;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setTravelers: (count: number | undefined) => void;
  setBudgetMin: (amount: number | undefined) => void;
  setBudgetMax: (amount: number | undefined) => void;
  setIsDataAvailableFromPlanJourney: (isAvailable: boolean) => void;
  resetPlanningData: () => void;
};

const useTripPlanningStore = create<ITripPlanningStore>((set) => ({
  startDate: "",
  endDate: "",
  travelers: 1,
  budgetMin: 0,
  budgetMax: 0,
  isDataAvailableFromPlanJourney: false,
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setTravelers: (travelers) => set({ travelers }),
  setBudgetMin: (budgetMin) => set({ budgetMin }),
  setBudgetMax: (budgetMax) => set({ budgetMax }),
  setIsDataAvailableFromPlanJourney: (value) =>
    set({ isDataAvailableFromPlanJourney: value }),
  resetPlanningData: () =>
    set({
      startDate: "",
      endDate: "",
      travelers: 1,
      budgetMin: 0,
      budgetMax: 0,
    }),
}));

export default useTripPlanningStore;
