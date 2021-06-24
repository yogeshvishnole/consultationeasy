import React from "react";

interface Props {}

const FormBox: React.FC<Props> = ({ children }) => {
  return <div className="form-container">{children}</div>;
};

export default FormBox;
