import { styled } from 'styled-components';

const StyledButton = styled.button<{ $bg: string }>`
  background-color: ${({ $bg }) => $bg};
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
`;

interface IButtonProps {
  text: string;
  bg: string;
  onClick: () => void;
}

const Button = ({ text, bg, onClick }: IButtonProps) => {
  return (
    <StyledButton $bg={bg} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
