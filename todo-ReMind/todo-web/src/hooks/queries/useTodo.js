import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../../api/todoApis";

export const useTodoList = () => {

    return useQuery({
        queryKey: ["todoList"],
        queryFn: getTodoList,
        retry: 0,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
}
