import styled from '@emotion/styled';
import SocialLoginButton from './SocialLoginButton';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const providers = ['google', 'naver', 'kakao'];

export default function SocialLoginGroup({ onLogin }) {
  return (
    <Wrapper>
      {providers.map((provider) => (
        <SocialLoginButton
          key={provider}
          provider={provider}
          onClick={onLogin}
        />
      ))}
    </Wrapper>
  );
}
