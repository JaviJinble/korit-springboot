import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: linear-gradient(135deg, #6c63ff 0%, #9c63ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(108, 99, 255, 0.35);
  flex-shrink: 0;
`;

const IconSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #e8eaf6;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const Tagline = styled.span`
  font-size: 11px;
  color: #8b8fa8;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export default function Logo({ name = 'MyApp', tagline = 'OAuth2 Login' }) {
  return (
    <Wrapper>
      <IconBox>
        <IconSvg />
      </IconBox>
      <TextGroup>
        <AppName>{name}</AppName>
        <Tagline>{tagline}</Tagline>
      </TextGroup>
    </Wrapper>
  );
}
