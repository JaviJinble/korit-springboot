import { axiosInstance } from "./axiosInstance"

export const getCategoryRequest = async () => {
    try {
        const response = await axiosInstance.get("/api/categories");
        console.log(response)
        return response.data;
    } catch(error) {
        return error.response.data;
    }
}

export const getCategoryColorsAndIcons = async () => {
    try{
        const response = await axiosInstance.get("/api/categories/colors-icons");
        return response.data;
    }catch(error) {
        return error.response.data;
    }
}

export const getNotCompletedCount = async () => {
    try{
        const response = await axiosInstance.get("/api/categories/count/completion/not");
        return response.data;
    }catch(error) {
        return error.response.data;
    }
}

export const registerCategory = async (data) => {
    try{
        const response = await axiosInstance.post("/api/categories", data);
        return response.data;
    }catch(error) {
        return error.response.data;
    }
}

export const deleteCategory = async (id) => {
    try{
        const response = await axiosInstance.delete(`/api/categories/${id}`);
        return response.data;
    }catch(error) {
        return error.response.data;
    }
}