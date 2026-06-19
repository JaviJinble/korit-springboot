import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory, registerCategory } from "../../api/categoryApis.js"

export const useCategoryRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => {
            return registerCategory(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
            queryClient.invalidateQueries(["categoryNotCompletedCount"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
}

export const useCategoryDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryId) => {
            return deleteCategory(categoryId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
            queryClient.invalidateQueries(["categoryNotCompletedCount"]);
        },
        onError: (error) => {
            alert(error.message);
        }
    })
}