import { axiosInstance } from "./axiosInstance";

export const getTodosRequest = async (params) => {
    const response = await axiosInstance.get("/api/todos", { params });
    return response.data;
};

export const createTodoRequest = async (body) => {
    const response = await axiosInstance.post("/api/todos", body);
    return response.data;
};

export const updateTodoRequest = async (todoId, body) => {
    const response = await axiosInstance.put(`/api/todos/${todoId}`, body);
    return response.data;
};

export const updateTodoCompleteRequest = async (todoId, body) => {
    const response = await axiosInstance.patch(`/api/todos/${todoId}/complete`, body);
    return response.data;
};

export const updateTodoFlagRequest = async (todoId, body) => {
    const response = await axiosInstance.put(`/api/todos/${todoId}/flag`, body);
    return response.data;
};

export const deleteTodoRequest = async (todoId) => {
    const response = await axiosInstance.delete(`/api/todos/${todoId}`);
    return response.data;
};
