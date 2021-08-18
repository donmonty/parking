import GlobalStyles from '../../styles/global';
import Header from '../Header';
import * as S from './styled';



function MasterPage({ children }) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <S.Wrapper>
        <S.Container>
          {children}
        </S.Container>
      </S.Wrapper>
    </>
  );
}

export default MasterPage;