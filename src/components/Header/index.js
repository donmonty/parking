import logo from '../../assets/airgarage-logo.png';
import * as S from './styled';

function Header() {
  return (
    <S.Header>
      <S.Container>
          <S.Logo src={logo} alt="Air Garage" />
      </S.Container>
    </S.Header>
  );
}

export default Header;