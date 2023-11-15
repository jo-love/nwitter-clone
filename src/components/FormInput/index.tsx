interface IFormIputProps {
  input: {
    id: number;
    name: string;
    placeholder: string;
    type: string;
  };
  value: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ input, onChange, value }: IFormIputProps) => {
  const { name, placeholder, type } = input;
  return (
    <div>
      <label>{name}</label>
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default FormInput;
