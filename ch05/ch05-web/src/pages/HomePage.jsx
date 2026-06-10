import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import useAuthStore from '../store/authStore';
import Header from '../components/organisms/Header';
import Badge from '../components/atoms/Badge';

/* ── 애니메이션 ─────────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── 레이아웃 ──────────────────────────────────────── */
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0f1117;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 40px 32px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
`;

/* ── 웰컴 배너 ─────────────────────────────────────── */
const WelcomeBanner = styled.div`
  background: linear-gradient(135deg, #1a1d27 0%, #22263a 100%);
  border: 1px solid #2e3150;
  border-radius: 6px;
  padding: 36px 40px;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.4s ease forwards;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #6c63ff, #9c63ff, #c063ff);
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #e8eaf6;
  letter-spacing: -0.02em;
  margin-bottom: 8px;

  span {
    background: linear-gradient(90deg, #6c63ff, #c063ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const WelcomeSub = styled.p`
  font-size: 14px;
  color: #8b8fa8;
  margin-bottom: 16px;
`;

/* ── 통계 카드 그리드 ───────────────────────────────── */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
  animation: ${fadeIn} 0.5s ease 0.1s both;
`;

const StatCard = styled.div`
  background: #1a1d27;
  border: 1px solid #2e3150;
  border-radius: 6px;
  padding: 24px;
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: #6c63ff;
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #e8eaf6;
  letter-spacing: -0.03em;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #8b8fa8;
`;

const StatDelta = styled.div`
  font-size: 12px;
  color: ${({ positive }) => (positive ? '#34d399' : '#f87171')};
  margin-top: 8px;
  font-weight: 500;
`;

/* ── 프로바이더 아이콘 표시 ─────────────────────────── */
const ProviderTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(108, 99, 255, 0.12);
  border: 1px solid rgba(108, 99, 255, 0.25);
  font-size: 13px;
  color: #818cf8;
  font-weight: 500;
  text-transform: capitalize;
`;

const providerEmoji = { google: '🔵', naver: '🟢', kakao: '🟡' };

/* ── 컴포넌트 ──────────────────────────────────────── */
export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <PageWrapper>
      <Header />

      <Main>
        {/* 웰컴 배너 */}
        <WelcomeBanner>
          <WelcomeTitle>
            안녕하세요, <span>{user?.name || '사용자'}</span>님 👋
          </WelcomeTitle>
          <WelcomeSub>
            {user?.email} · OAuth2로 로그인됨
          </WelcomeSub>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Badge color="success" dot>인증됨</Badge>
            {user?.provider && (
              <ProviderTag>
                {providerEmoji[user.provider] || '🔗'} {user.provider}
              </ProviderTag>
            )}
          </div>
        </WelcomeBanner>

        {/* 샘플 통계 카드 */}
        <StatsGrid>
          <StatCard>
            <StatValue>128</StatValue>
            <StatLabel>총 방문 수</StatLabel>
            <StatDelta positive>↑ 12% 이번 주</StatDelta>
          </StatCard>
          <StatCard>
            <StatValue>34</StatValue>
            <StatLabel>활성 세션</StatLabel>
            <StatDelta positive>↑ 5% 어제 대비</StatDelta>
          </StatCard>
          <StatCard>
            <StatValue>7</StatValue>
            <StatLabel>알림</StatLabel>
            <StatDelta>→ 변동 없음</StatDelta>
          </StatCard>
          <StatCard>
            <StatValue>99%</StatValue>
            <StatLabel>서비스 가용성</StatLabel>
            <StatDelta positive>↑ 안정</StatDelta>
          </StatCard>
        </StatsGrid>

        {/* 안내 박스 */}
        <div
          style={{
            background: '#1a1d27',
            border: '1px solid #2e3150',
            borderRadius: '6px',
            padding: '24px',
            color: '#8b8fa8',
            fontSize: '14px',
            lineHeight: '1.8',
            animation: 'none',
          }}
        >
          💡 이 페이지는 <strong style={{ color: '#e8eaf6' }}>샘플 홈 대시보드</strong>입니다.
          실제 API와 연결 후 원하는 콘텐츠로 교체하세요.
          <br />
          <code style={{ color: '#6c63ff', background: 'rgba(108,99,255,0.08)', padding: '2px 6px', borderRadius: '4px' }}>
            useAuthStore()
          </code>{' '}
          훅을 통해 현재 사용자 정보와 로그아웃 기능을 사용할 수 있습니다.
        </div>
      </Main>
    </PageWrapper>
  );
}
