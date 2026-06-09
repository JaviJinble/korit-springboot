import { axiosInstance } from "./axioxInstance"

// 회원가입 요청
export const signUp = async (signUpData) => {
    const response = await axiosInstance.post("/api/auth/users", { ...signUpData, roleId: 1});
    return response.data;
}

// 로그인
export const signIn = async (signInData) => {
    const response = await axiosInstance.post("/api/auth/users/token", signInData);
    return response.data;
}


// 로그아웃
export const logout = async () => {
    localStorage.removeItem("accessToken");
}

// 사용자정보 조회
export const getUser = async () => {
    const response = await axiosInstance.get("/api/me");
    return response.data;
}
