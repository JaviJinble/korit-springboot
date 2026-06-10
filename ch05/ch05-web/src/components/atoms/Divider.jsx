import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 8px 0;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: #2e3150;
`;

const Label = styled.span`
  font-size: 12px;
  color: #8b8fa8;
  white-space: nowrap;
  flex-shrink: 0;
`;

export default function Divider({ label }) {
  return (
    <Wrapper>
      <Line />
      {label && <Label>{label}</Label>}
      <Line />
    </Wrapper>
  );
}
