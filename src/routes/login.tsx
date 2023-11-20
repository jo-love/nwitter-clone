import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Error, Form, Switcher, Title, Wrapper } from '../styles/authStyle';
import { FormInput } from '../features/ui';
import { Input } from '../styles/inputStyle';
import { signUpValidation } from '../utils/signupValidation';
import UseForm from '../hooks/UseForm';
import { IFormValues } from '../types';
import { auth } from '../lib/firebase';
import { useState } from 'react';
import { IInput } from './sign-up';

const LOGININPUTS: IInput[] = [
  {
    id: 1,
    name: 'email',
    placeholder: 'Email',
    type: 'email',
  },
  {
    id: 2,
    name: 'password',
    placeholder: 'Password',
    type: 'password',
  },
];

const initialValues = {
  password: '',
  email: '',
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (values: IFormValues) => {
    const { email, password } = values;
    resetAuthError();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setAuthErrorMsg(e);
      }
    } finally {
      setLoading(false);
    }
  };
  const {
    formValues,
    errors,
    handleChange,
    handleSubmit,
    resetAuthError,
    setAuthErrorMsg,
    handleBlur,
    isFocused,
    handleFocus,
    authError,
  } = UseForm({
    initialValues,
    onSubmit: onSubmit,
    validate: signUpValidation,
  });

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={handleSubmit}>
        {LOGININPUTS.map((input) => (
          <FormInput
            key={input.id}
            input={input}
            value={formValues[input.name]}
            errorMsg={errors[input.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            isFocused={isFocused[input.name]}
          />
        ))}
        <Input type="submit" value={isLoading ? 'Loading...' : 'Log in'} />
      </Form>
      {authError !== '' ? <Error>{authError}</Error> : null}
      <Switcher>
        Don't have an account?&nbsp;
        <Link to="/signup">Create one &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
};

export default Login;
