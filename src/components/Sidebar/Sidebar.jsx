import BoardList from 'components/BoardList/BoardList';
import { StyledSidebar, Container } from './Sidebar.styled';
import LogoutBtn from 'components/LogoutBtn/LogoutBtn';
import NeedHelp from 'components/NeedHelp/NeedHelp';
import Logo from 'components/Logo/Logo';

function Sidebar() {
  return (
    <StyledSidebar>
      <Container>
      <Logo />
      <BoardList />
      <NeedHelp />
      <LogoutBtn />
      </Container>
    </StyledSidebar>
  );
}

export default Sidebar;
