import styled from 'styled-components';
import { colors } from '../../styles/variables';

export const Unlist = styled.ul`
  margin: 0 auto;
`;

export const TotalCount = styled.div`
  text-align: right;
  font-weight: 300;
  font-size: 1.2rem;
  padding: 0 1rem 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 10px solid ${colors.grey};
  & strong {
    font-weight: 500;
  }
`;