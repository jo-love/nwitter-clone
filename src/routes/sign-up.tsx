import React, { useState } from 'react';
import { styled } from 'styled-components';
import FormInput from '../components/FormInput';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

const INPUTS = [
  { id: 1, name: 'name', placeholder: 'Name', type: 'text' },
  { id: 2, name: 'email', placeholder: 'Email', type: 'email' },
  { id: 3, name: 'password', placeholder: 'Password', type: 'password' },
];

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={handleSubmit}>
        {INPUTS.map((input) => (
          <FormInput
            key={input.id}
            input={input}
            value={formValues['email']}
            onChange={handleChange}
          />
        ))}

        <Input type="submit" value="sign up" />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
    </Wrapper>
  );
};

export default SignUp;
