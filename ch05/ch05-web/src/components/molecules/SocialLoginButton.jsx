import styled from '@emotion/styled';

/* ── 제공자별 스타일 정의 ─────────────────────────────── */
const providerStyles = {
  google: {
    bg: '#ffffff',
    hoverBg: '#f5f5f5',
    text: '#3c4043',
    border: '#dadce0',
  },
  naver: {
    bg: '#03c75a',
    hoverBg: '#02b050',
    text: '#ffffff',
    border: '#03c75a',
  },
  kakao: {
    bg: '#fee500',
    hoverBg: '#f5dc00',
    text: '#191919',
    border: '#fee500',
  },
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 13px 20px;
  border-radius: 6px;
  border: 1px solid ${({ provider }) => providerStyles[provider]?.border || '#2e3150'};
  background: ${({ provider }) => providerStyles[provider]?.bg || '#22263a'};
  color: ${({ provider }) => providerStyles[provider]?.text || '#e8eaf6'};
  font-size: 15px;
  font-weight: 500;
  font-family: inherit;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.2s ease;
  }

  &:hover {
    background: ${({ provider }) => providerStyles[provider]?.hoverBg || '#2a2e47'};
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
`;

/* ── 소셜 아이콘 SVG ─────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function NaverIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <rect width="24" height="24" rx="3" fill="#03C75A" />
      <path
        d="M13.6 12.3L10.2 7H7v10h3.4v-5.3L14.2 17H17V7h-3.4v5.3z"
        fill="#fff"
      />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <ellipse cx="12" cy="10.5" rx="10" ry="8.5" fill="#191919" />
      <path
        d="M7 13.5c.5 1.5 2.5 3 5 3s4.5-1.5 5-3"
        stroke="#FEE500"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9" cy="10" r="1" fill="#FEE500" />
      <circle cx="15" cy="10" r="1" fill="#FEE500" />
    </svg>
  );
}

const iconMap = {
  google: <GoogleIcon />,
  naver: <NaverIcon />,
  kakao: <KakaoIcon />,
};

const labelMap = {
  google: 'Google로 계속하기',
  naver: '네이버로 계속하기',
  kakao: '카카오로 계속하기',
};

/* ── 컴포넌트 ─────────────────────────────────────────── */
export default function SocialLoginButton({ provider, onClick }) {
  return (
    <StyledButton provider={provider} onClick={() => onClick?.(provider)}>
      <IconWrapper>{iconMap[provider]}</IconWrapper>
      {labelMap[provider]}
    </StyledButton>
  );
}
