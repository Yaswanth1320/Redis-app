import { create } from "zustand";

type Preferences = {
  soundEnabled: boolean;
  setSoundEnabled: (soundEnabled: boolean) => void;
};

export const usePreference = create<Preferences>((set) => ({
  soundEnabled: true,
  setSoundEnabled: (soundEnabled: boolean) => set({ soundEnabled }),
}));
