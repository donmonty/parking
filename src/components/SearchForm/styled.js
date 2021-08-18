import styled from 'styled-components';
import { colors, screen } from '../../styles/variables';


export const Form = styled.form`
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1.5rem 0 2rem;
  column-gap: 15px;
  @media screen and (max-width: ${screen.md}) {
    display: block;
  }
  & input {
    display: inline-flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    padding: 0.5rem 1.5rem;
    color: ${colors.darkGrey};
    outline: none;
    border-radius: 10rem;
    border: 2px solid ${colors.grey};
    background-color: #fff;
    box-sizing: border-box;
    min-height: 40px;
    flex: 1;
    @media screen and (max-width: ${screen.md}) {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  border: 0;
  border-radius: 10rem;
  background-color: ${colors.orange};
  padding: 0 2rem;
  text-transform: uppercase;
  color: white;
  font-weight: 500;
  cursor: pointer;
  min-height: 40px;
`;