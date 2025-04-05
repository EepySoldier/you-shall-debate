import './TopicDisplay.css';

type TopicDisplayProps = {
  topic: string;
};

const TopicDisplay = ({ topic }: TopicDisplayProps) => (
  <div className="topic">
    <h2 className="topic__title">Current Topic:</h2>
    <p className="topic__text">{topic}</p>
  </div>
);

export default TopicDisplay;
