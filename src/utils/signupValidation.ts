import { IErrors, IFormValues } from '../types';

export const signUpValidation = (values: IFormValues) => {
  const { name, password, email, height } = values;
  // 어떤 인풋종류가 존재하는지 판단하여 존재하지 않는 안풋은 에러에 아예 넣으면 안됨
  const inputkeys = Object.keys(values);
  const errors: Partial<IErrors> = {};
  const nameRegex = /^[A-Za-z0-9]{3,16}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const heightRegex = /^[1-9]\d*(\.\d{0,1})?$/;

  if (inputkeys.includes('name')) {
    if (!name) {
      errors.name = 'Name is required!';
    } else if (!nameRegex.test(name)) {
      errors.name =
        'Name should be 3-16 characters and should not include any special character!';
    }
  }
  if (inputkeys.includes('password')) {
    if (!password) {
      errors.password = 'Password is required!';
    } else if (!passwordRegex.test(password)) {
      errors.password =
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special charater!';
    }
  }
  if (inputkeys.includes('email')) {
    if (!email) {
      errors.email = 'Email is required!';
    } else if (!emailRegex.test(email)) {
      errors.email = 'It should be a valid email address!';
    }
  }
  if (inputkeys.includes('height')) {
    if (!heightRegex.test(String(height))) {
      errors.height =
        'Height should be greater than 0 and can be up to one decimal place.';
    }
  }
  return errors;
};
