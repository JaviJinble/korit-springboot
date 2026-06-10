import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import useAuthStore from '../store/authStore';
import LoginCard from '../components/organisms/LoginCard';

/* ── 배경 광원 효과 ──────────────────────────────────── */
const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f1117;
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -180px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(108, 99, 255, 0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -200px;
    right: -100px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(156, 99, 255, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WelcomeText = styled.p`
  font-size: 13px;
  color: #8b8fa8;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 500;

  span {
    color: #6c63ff;
  }
`;

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // 소셜 로그인 버튼 클릭 핸들러
  // 실제 OAuth2 흐름은 여기에 구현하세요
  const handleLogin = (provider) => {
    // TODO: 실제 OAuth2 redirect URL로 교체
    login(provider); // mock: store에 바로 인증 처리
    navigate('/');
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <WelcomeText>
          <span>✦</span> 서비스에 오신 것을 환영합니다 <span>✦</span>
        </WelcomeText>
        <LoginCard onLogin={handleLogin} />
      </ContentWrapper>
    </PageWrapper>
  );
}
