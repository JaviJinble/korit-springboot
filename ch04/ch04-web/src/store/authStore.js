import { create } from "zustand";

export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem("accessToken"),

    saveToken: (token) => {
        localStorage.setItem("accessToken", token);
        set({ accessToken: token });
    },

    removeToken: () => {
        localStorage.removeItem("accessToken");
        set({ accessToken: null});
    },

    get isLoggedIn() {
    return !!this.accessToken;
    }
}));