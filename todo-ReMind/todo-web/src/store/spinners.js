import { create } from "zustand";

export const useSpinnersStore = create((set) => ({
    isLoading: true,

    setLoading: (state) => {
        set({ isLoading: state });
    } 
}));