import styled from '@emotion/styled';
import useAuthStore from '../../store/authStore';
import Logo from '../atoms/Logo';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: #1a1d27;
  border-bottom: 1px solid #2e3150;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #e8eaf6;
`;

const UserEmail = styled.span`
  font-size: 11px;
  color: #8b8fa8;
`;

const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: linear-gradient(135deg, #6c63ff, #9c63ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const initial = user?.name?.[0]?.toUpperCase() || 'U';

  return (
    <StyledHeader>
      <Logo name="MyApp" tagline="Dashboard" />
      <Right>
        <Badge color="success" dot>온라인</Badge>
        <UserInfo>
          <UserName>{user?.name || '사용자'}</UserName>
          <UserEmail>{user?.email || ''}</UserEmail>
        </UserInfo>
        <Avatar>{initial}</Avatar>
        <Button variant="ghost" size="sm" onClick={logout}>
          로그아웃
        </Button>
      </Right>
    </StyledHeader>
  );
}
