import { axiosInstance } from "./axiosInstance";

export const getCategoriesRequest = async () => {
    const response = await axiosInstance.get("/api/categories");
    return response.data;
};

export const getCategoryRequest = async (categoryId) => {
    const response = await axiosInstance.get(`/api/categories/${categoryId}`);
    return response.data;
};

export const getCategoryCompletionCountsRequest = async () => {
    const response = await axiosInstance.get("/api/categories/count/completion/not");
    return response.data;
};

export const createCategoryRequest = async (body) => {
    const response = await axiosInstance.post("/api/categories", body);
    return response.data;
};

export const updateCategoryRequest = async (categoryId, body) => {
    const response = await axiosInstance.put(`/api/categories/${categoryId}`, body);
    return response.data;
};

export const deleteCategoryRequest = async (categoryId) => {
    const response = await axiosInstance.delete(`/api/categories/${categoryId}`);
    return response.data;
};
