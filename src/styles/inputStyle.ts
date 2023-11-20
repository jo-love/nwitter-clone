import { styled } from 'styled-components';

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  font-size: 16px;
  &[type='submit'] {
    background-color: plum;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
