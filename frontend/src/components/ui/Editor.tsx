import React from "react";
import SunEditor from "suneditor-react";

interface Props {
  handleChange: (e: any) => void;
  content: string;
}

const Editor: React.FC<Props> = ({ handleChange, content }) => {
  return <SunEditor onChange={handleChange} setContents={content} />;
};

export default Editor;
