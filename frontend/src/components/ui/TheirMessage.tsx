interface Props {
  message: string;
}

const TheirMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="message their-message">
      <p>{message}</p>
    </div>
  );
};

export default TheirMessage;
