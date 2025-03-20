import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AmbassadorInfo } from "@/types/userInfoTypes";

interface AmbassadorState extends AmbassadorInfo {
  setUser: (user: Partial<AmbassadorState>) => void;
  resetUser: () => void;
}

export const useAmbassadorStore = create(
  persist<AmbassadorState>(
    (set) => ({
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      pointsEarned: undefined,
      middleName: undefined,
      _id: undefined,
      setUser: (user) => set((state) => ({ ...state, ...user })),
      resetUser: () =>
        set({
          firstName: undefined,
          lastName: undefined,
          pointsEarned: undefined,
          email: undefined,
          middleName: undefined,
          _id: undefined,
        }),
    }),
    {
      name: "ambassador-storage",
      storage: createJSONStorage(() => sessionStorage),
    })
);
