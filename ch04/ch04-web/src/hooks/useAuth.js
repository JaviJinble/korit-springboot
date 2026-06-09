import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { getUser, logout, signIn, signUp } from "../api/authApi";

export function useSignUp() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (signUpData) => signUp(signUpData),
        onSuccess: () => {
            alert("회원가입 성공! 로그인 해주세요.");
            navigate("/auth/signin");
        },
        onError: (error) => {
            const message = error.response.data.body.message;
            alert(message);
        }
    });
}

export function useSignIn() {
    const navigate = useNavigate();
    const saveToken = useAuthStore((state) => state.saveToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (signInData) => signIn(signInData),
        onSuccess: (data) => {
            saveToken(data.body.accessToken);
            queryClient.invalidateQueries();
            navigate("/dash");
        },
        onError: (error) => {
            const message = error.response.data.body.message;
            alert(message);
        }
    })
};

export function useMe() {
    return useQuery({
        queryKey: ["me"],
        queryFn: getUser,
    });
}

export function useLogout() {
    const navigate = useNavigate();
    const removeToken = useAuthStore((state) => state.removeToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            removeToken();
            queryClient.clear();
            navigate("/auth/signin", { replace: true });
        },
    });
}
