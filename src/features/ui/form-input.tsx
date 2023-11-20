import { styled } from 'styled-components';
import { Input } from '../../styles/inputStyle';
import { IInput } from '../../routes/sign-up';

interface IFormIputProps {
  input: IInput;
  value: string | number | undefined;
  isFocused?: boolean;
  errorMsg?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInputWrapper = styled.div`
  label {
    margin-bottom: 20px;
    display: block;
  }
`;

const ErrorText = styled.span<{
  $isFocused?: boolean;
}>`
  font-size: 12px;
  margin-top: 6px;
  color: #960000;
  display: block;
  min-height: 30px;
  line-height: normal;
  visibility: ${({ $isFocused }) =>
    $isFocused || $isFocused === undefined ? 'hidden' : 'visible'};
`;

const FormInput = ({
  input,
  onChange,
  value,
  isFocused,
  errorMsg,
  onBlur,
  onFocus,
}: IFormIputProps) => {
  const { name, placeholder, type } = input;

  return (
    <FormInputWrapper>
      <label>{name}</label>
      <Input
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value={value || ''}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <ErrorText $isFocused={isFocused}>{errorMsg}</ErrorText>
    </FormInputWrapper>
  );
};

export default FormInput;
