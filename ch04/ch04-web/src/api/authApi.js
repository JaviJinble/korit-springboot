import { axiosInstance } from "./axioxInstance";

export const signUp = async (signUpData) => {
    const response = await axiosInstance.post("/api/auth/users", { ...signUpData, roleId: 1 });
    return response.data;
};

export const signIn = async (signInData) => {
    const response = await axiosInstance.post("/api/auth/users/token", signInData);
    return response.data;
};

export const logout = async () => {
    localStorage.removeItem("accessToken");
};

export const getUser = async () => {
    const response = await axiosInstance.get("/api/me");
    return response.data;
};
