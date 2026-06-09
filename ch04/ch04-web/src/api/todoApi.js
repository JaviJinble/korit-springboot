import { axiosInstance } from "./axioxInstance";

export const getTodos = async () => {
    const response = await axiosInstance.get("/api/todos");
    return response.data;
};

export const addTodo = async ({ content, deadline, priority }) => {
    const response = await axiosInstance.post("/api/todos", { content, deadline, priority });
    return response.data;
};

export const toggleTodo = async (todoId) => {
    const response = await axiosInstance.patch(`/api/todos/${todoId}/toggle`);
    return response.data;
};

export const updateTodo = async ({ todoId, content, deadline, priority }) => {
    const response = await axiosInstance.put(`/api/todos/${todoId}`, { content, deadline, priority });
    return response.data;
};

export const deleteTodo = async (todoId) => {
    const response = await axiosInstance.delete(`/api/todos/${todoId}`);
    return response.data;
};
