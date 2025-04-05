import './VoteArrow.css';

const VoteArrow = ({
  type,
  voted,
  onClick,
  isDisabled,
}: {
  type: 'up' | 'down';
  voted: boolean;
  onClick: () => void;
  isDisabled: boolean;
}) => {
  const fillColor = voted ? (type === 'up' ? '#2e7d32' : '#c62828') : '#aaa';

  return (
    <svg
      onClick={isDisabled ? undefined : onClick}
      className={`vote-arrow ${type} ${isDisabled ? 'disabled' : ''}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: isDisabled ? 'default' : 'pointer' }}
    >
      <path
        d={
          type === 'up'
            ? 'M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z'
            : 'M4 10h4V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v7h4a1.001 1.001 0 0 1 .781 1.625l-8 10c-.381.475-1.181.475-1.562 0l-8-10A1.001 1.001 0 0 1 4 10z'
        }
        fill={fillColor}
      />
    </svg>
  );
};

export default VoteArrow;
