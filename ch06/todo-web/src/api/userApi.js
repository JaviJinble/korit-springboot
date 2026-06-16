import { axiosInstance } from "./axiosInstance";

export const getMeRequest = async () => {
    const response = await axiosInstance.get("/api/users/me");

    return response.data;
};
