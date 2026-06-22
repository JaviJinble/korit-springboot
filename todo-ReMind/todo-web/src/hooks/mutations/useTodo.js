import { useMutation, useQueryClient } from "@tanstack/react-query"
import { registerTodo } from "../../api/todoApis";

export const useTodoRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => registerTodo(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries(["todoList"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    });
}

export const useTodoCompleteMutationMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => registerTodo(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries(["todoList"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    });
}