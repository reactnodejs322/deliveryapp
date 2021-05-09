import React from "react";
import "./form-input-styles.scss";
interface FormInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  label: string;
  [x: string]: any;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  onChange,
  ...otherProps
}) => (
  <div className="group">
    <input className="form-input" onChange={onChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
