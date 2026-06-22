import { axiosInstance } from "./axiosInstance"

export const registerTodo = async (data) => {
    try{
        const response = await axiosInstance.post("/api/todos", data);
        return response.data;
    }catch(error) {
        return error.response.data;
    }
}


export const getTodoList = async () => {
    try{
        const response = await axiosInstance.get("/api/todos");
        return response.data;
    }catch(error) {
        return error.response.data;
    }
}

export const updateCompletion = async (data) => {
    try{
        const response = await axiosInstance.patch(`/api/todos/${data.todoId}/complete`, data);
        return response.data;
    }catch(error) {
        return error.response.data;
    }
}

