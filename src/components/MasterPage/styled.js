import styled from 'styled-components'
import { screen } from '../../styles/variables'

export const Wrapper = styled.section`
  background-color: #fff;
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${screen.lg};
  padding: 1rem;
  margin: 0 auto;
  @media screen and (max-width: ${screen.xs}) {
    max-width: ${screen.xs};
  }
`;