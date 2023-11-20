import FormInput from '../features/ui/form-input';
import { Input } from '../styles/inputStyle';
import { IFormValues } from '../types/index';
import UseForm from '../hooks/UseForm';
import { signUpValidation } from '../utils/signupValidation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Form, Title, Wrapper, Error } from '../styles/authStyle';
import { useState } from 'react';
import { INPUTS } from '../constants/form';

export interface IInput {
  id: number;
  name: keyof IFormValues;
  placeholder: string;
  type: string;
}

const initialValues = {
  name: '',
  password: '',
  email: '',
};

const SignUp = () => {
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (values: IFormValues) => {
    const { name, email, password } = values;
    resetAuthError();
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(credentials.user, { displayName: name });
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setAuthErrorMsg(e);
      }
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const {
    formValues,
    errors,
    isFocused,
    handleChange,
    handleSubmit,
    handleBlur,
    handleFocus,
    resetAuthError,
    setAuthErrorMsg,
    authError,
  } = UseForm({
    initialValues,
    onSubmit: onSubmit,
    validate: signUpValidation,
  });

  return (
    <Wrapper>
      <Title>Signup into 𝕏</Title>
      <Form onSubmit={handleSubmit}>
        {INPUTS.map((input) => (
          <FormInput
            key={input.id}
            input={input}
            value={formValues[input.name]}
            isFocused={isFocused[input.name]}
            onChange={handleChange}
            errorMsg={errors[input.name]}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        ))}
        <Input type="submit" value={isLoading ? 'Loading...' : 'sign up'} />
        {authError !== '' ? <Error>{authError}</Error> : null}
      </Form>
    </Wrapper>
  );
};

export default SignUp;
