import styled from '@emotion/styled';
import { css } from '@emotion/react';

const variants = {
  primary: css`
    background: #6c63ff;
    color: #fff;
    border: none;
    &:hover {
      background: #7c74ff;
      box-shadow: 0 0 16px rgba(108, 99, 255, 0.4);
    }
    &:active {
      background: #5c54df;
    }
  `,
  ghost: css`
    background: transparent;
    color: #8b8fa8;
    border: 1px solid #2e3150;
    &:hover {
      color: #e8eaf6;
      border-color: #6c63ff;
      background: rgba(108, 99, 255, 0.08);
    }
  `,
  social: css`
    background: #22263a;
    color: #e8eaf6;
    border: 1px solid #2e3150;
    &:hover {
      border-color: #6c63ff;
      background: #2a2e47;
    }
  `,
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: ${({ size }) => (size === 'sm' ? '8px 16px' : '13px 24px')};
  border-radius: 6px;
  font-size: ${({ size }) => (size === 'sm' ? '13px' : '15px')};
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: all 0.2s ease;
  cursor: pointer;
  ${({ variant }) => variants[variant] || variants.primary}
`;

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  ...rest
}) {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
