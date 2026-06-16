import { useQuery } from "@tanstack/react-query";
import { getMeRequest } from "../../api/userApi";

export const useMe = () => {
    const accessToken = localStorage.getItem("accessToken");

    return useQuery({
        queryKey: ["me", accessToken],
        queryFn: () => getMeRequest(),
        enabled: !!accessToken,
        staleTime: 6000 * 10,
        gcTime: 6000 * 10,
    });
};
