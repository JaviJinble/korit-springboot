import styled from '@emotion/styled';

const colorMap = {
  success: { bg: 'rgba(52, 211, 153, 0.12)', text: '#34d399', border: 'rgba(52, 211, 153, 0.3)' },
  warning: { bg: 'rgba(251, 191, 36, 0.12)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.3)' },
  error:   { bg: 'rgba(248, 113, 113, 0.12)', text: '#f87171', border: 'rgba(248, 113, 113, 0.3)' },
  info:    { bg: 'rgba(108, 99, 255, 0.12)', text: '#818cf8', border: 'rgba(108, 99, 255, 0.3)' },
  default: { bg: '#22263a', text: '#8b8fa8', border: '#2e3150' },
};

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  background: ${({ color }) => colorMap[color]?.bg || colorMap.default.bg};
  color: ${({ color }) => colorMap[color]?.text || colorMap.default.text};
  border: 1px solid ${({ color }) => colorMap[color]?.border || colorMap.default.border};
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
`;

export default function Badge({ children, color = 'default', dot = false }) {
  return (
    <StyledBadge color={color}>
      {dot && <Dot />}
      {children}
    </StyledBadge>
  );
}
