import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 인증 상태 Zustand Store
 *
 * persist 미들웨어로 localStorage에 자동 저장됩니다.
 * 실제 OAuth2 API 연결 시 login() 함수 내부만 교체하세요.
 */
const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,

      // TODO: 실제 OAuth2 흐름으로 교체
      login: (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      setAccessToken: (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        set({ accessToken, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useAuthStore;
