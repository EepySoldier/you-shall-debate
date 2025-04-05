import './LoadingScreen.css';

type LoadingScreenProps = {
  progress: number;
};

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
  const getProgressText = () => {
    if (progress < 30) {
      return 'Initializing...';
    } else if (progress < 60) {
      return 'Loading content...';
    } else if (progress < 90) {
      return 'Almost there...';
    } else {
      return 'Finishing up...';
    }
  };

  return (
    <div className="loading-screen">
      <div className="loading">
        <span className="loading__dot"></span>
        <span className="loading__dot"></span>
        <span className="loading__dot"></span>
      </div>
      <h1>Loading</h1>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">{getProgressText()}</p>
    </div>
  );
};

export default LoadingScreen;
