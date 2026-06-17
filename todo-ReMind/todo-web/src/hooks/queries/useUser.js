import { useQuery } from "@tanstack/react-query"
import { getMeRequest } from "../../api/userApis";

export const useMe = () => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["me", accessToken],
        queryFn: getMeRequest,
        retry: 0,
        staleTime: 6000 * 60 * 24,
        gcTime: 6000 * 60 * 24,
    });
}