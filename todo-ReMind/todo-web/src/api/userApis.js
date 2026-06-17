import { axiosInstance } from "./axiosInstance"

export const getMeRequest = async () => {
    try {
        const response = await axiosInstance.get("/api/users/me");
        console.log(response)
        return response.data;
    } catch(error) {
        return error.response.data;
    }
}