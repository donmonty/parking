import styled from 'styled-components';
import { colors, screen } from '../../styles/variables';

export const Header = styled.header`
  background-color: ${colors.lightOrange};
  border-bottom: 5px solid ${colors.orange};
  padding: 1rem 0;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${screen.lg};
  padding: 0 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 100%;
  max-width: 160px;
  margin: 0;
`;

export const HeadingGroup = styled.div`
  padding-left: 1rem;
`;

export const Title = styled.h1`
  @media screen and (max-width: ${screen.sm}) {
    font-size: 1.2rem;
  }
`;

export const SubTitle = styled.h2`
  font-weight: 300;
  @media screen and (max-width: ${screen.sm}) {
    font-size: 1rem;
  }
`;