import { styled } from 'styled-components';

const TextArea = styled.textarea<{ $border?: string }>`
  border: ${({ $border }) => $border ?? '2px solid white'};
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: transparent;
  width: 100%;
  line-height: 1.1;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

interface ITextareaPrpos {
  rows: number;
  maxLength: number;
  value: string;
  placeholder?: string;
  required?: boolean;
  border?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  rows,
  maxLength,
  value,
  placeholder,
  required,
  onChange,
  border,
}: ITextareaPrpos) => {
  return (
    <TextArea
      rows={rows}
      maxLength={maxLength}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      $border={border}
      autoFocus
    />
  );
};

export default Textarea;
