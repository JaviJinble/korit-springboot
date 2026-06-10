import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Logo from '../atoms/Logo';
import Divider from '../atoms/Divider';
import SocialLoginGroup from '../molecules/SocialLoginGroup';

/* ── 애니메이션 ─────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── 스타일드 컴포넌트 ──────────────────────────────── */
const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #1a1d27;
  border: 1px solid #2e3150;
  border-radius: 6px;
  padding: 44px 40px 36px;
  animation: ${fadeUp} 0.45s ease forwards;
  position: relative;
  overflow: hidden;

  /* 상단 포인트 그라디언트 라인 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6c63ff, #9c63ff, #c063ff);
  }
`;

const LogoSection = styled.div`
  margin-bottom: 32px;
`;

const TitleSection = styled.div`
  margin-bottom: 28px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #e8eaf6;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #8b8fa8;
  line-height: 1.6;
`;

const Footer = styled.p`
  margin-top: 24px;
  font-size: 12px;
  color: #8b8fa8;
  text-align: center;
  line-height: 1.7;

  a {
    color: #6c63ff;
    font-weight: 500;
    transition: color 0.2s;
    &:hover { color: #9c63ff; }
  }
`;

/* ── 컴포넌트 ──────────────────────────────────────── */
export default function LoginCard({ onLogin }) {
  return (
    <Card>
      <LogoSection>
        <Logo name="MyApp" tagline="OAuth2 Login" />
      </LogoSection>

      <TitleSection>
        <Title>로그인</Title>
        <Subtitle>
          소셜 계정을 선택하여 서비스를 이용해 주세요.
        </Subtitle>
      </TitleSection>

      <Divider label="소셜 계정으로 계속하기" />

      <div style={{ marginTop: '20px' }}>
        <SocialLoginGroup onLogin={onLogin} />
      </div>

      <Footer>
        로그인 시 서비스{' '}
        <a href="#">이용약관</a> 및{' '}
        <a href="#">개인정보처리방침</a>에 동의합니다.
      </Footer>
    </Card>
  );
}
