interface Props {
  message: string;
}

const YourMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="message your-message">
      <p>{message}</p>
    </div>
  );
};

export default YourMessage;
