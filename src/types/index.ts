export interface IFormValues {
  name?: string;
  password: string;
  email: string;
  height?: number;
}

export interface IUseFormProps {
  initialValues: IFormValues;
  onSubmit: (values: IFormValues) => void;
  validate: (values: IFormValues) => Partial<IErrors>;
}

export interface IErrors {
  name?: string;
  password: string;
  email: string;
  height?: string;
}

export interface IFocus {
  name: boolean;
  password: boolean;
  email: boolean;
  height: boolean;
}
