import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<Props> = ({ error, type = "text", ...rest }) => {
  return (
    <div className="form__input-container">
      <input type={type} className="input" {...rest} />
      {error && <p className="paragraph paragraph--error-small">{error}</p>}
    </div>
  );
};

export default Input;
