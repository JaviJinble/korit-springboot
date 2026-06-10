import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import ProtectedRoute from './router/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Oauth2CallbackPage from './pages/Oauth2CallbackPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 보호된 홈 라우트: 미인증 시 /login으로 redirect */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path='/auth/oauth2/callback' element={<Oauth2CallbackPage />} />

        {/* 알 수 없는 경로 → 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
