import { useEffect, useState } from 'react';
import { IErrors, IFocus, IUseFormProps } from '../types';
import { ERRORCODE } from '../constants/error-code';
import { FirebaseError } from 'firebase/app';

const UseForm = ({ initialValues, onSubmit, validate }: IUseFormProps) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<IErrors>>({});
  const [authError, setAuthError] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState<Partial<IFocus>>({});

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true);
    e.preventDefault();

    // 시용자가 어떠한 상호작용없이 제출버튼을 누르는 경우
    const forcedFocus = {} as any;
    for (const key in formValues) {
      forcedFocus[key] = false;
    }
    setIsFocused(forcedFocus);

    setErrors(validate(formValues));
  };

  const handleBlur = ({
    target: { name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused((prevState) => ({ ...prevState, [name]: false }));
  };

  useEffect(() => {
    if (Object.keys(isFocused).length !== 0) {
      setErrors(validate(formValues));
    }
  }, [isFocused]);

  const handleFocus = ({
    target: { name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused((prevState) => ({ ...prevState, [name]: true }));
    // setErrors({});
  };

  const resetAuthError = () => {
    setAuthError('');
  };

  const setAuthErrorMsg = (e: FirebaseError) => {
    setAuthError(ERRORCODE[e.message]);
  };

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length === 0) {
      onSubmit(formValues);
    }
    setSubmitted(false);
  }, [errors, isSubmitted]);

  return {
    formValues,
    errors,
    isSubmitted,
    isFocused,
    handleChange,
    handleSubmit,
    handleBlur,
    handleFocus,
    authError,
    resetAuthError,
    setAuthErrorMsg,
  };
};

export default UseForm;
