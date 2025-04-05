import { useState, useEffect } from 'react';
import './Feedback.css';
import socket from '../../../../socket';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    socket.on('feedbackSuccess', () => {
      setSubmitted(true);
      setMessage('');
    });

    socket.on('feedbackCooldown', ({ remainingSeconds }) => {
      setCooldown(remainingSeconds);
    });

    socket.on('feedbackError', (msg) => {
      setError(msg);
    });

    return () => {
      socket.off('feedbackSuccess');
      socket.off('feedbackCooldown');
      socket.off('feedbackError');
    };
  }, []);

  useEffect(() => {
    if (cooldown === null) return;

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (message.trim().length < 5) return;

    socket.emit('feedback', message);
  };

  const formatCooldown = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="feedback">
      <h1 className="feedback__title">Send Feedback</h1>

      {!submitted ? (
        <form className="feedback__form" onSubmit={handleSubmit}>
          <textarea
            className="feedback__textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your feedback..."
            rows={4}
            maxLength={470}
            disabled={cooldown !== null}
          />
          <button
            type="submit"
            disabled={message.trim().length < 5 || cooldown !== null}
            style={cooldown !== null ? { backgroundColor: '#c62828' } : {}}
          >
            {cooldown !== null ? `Cooldown: ${formatCooldown(cooldown)}` : 'Submit'}
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
      ) : (
        <p className="feedback__success">Thanks for your feedback!</p>
      )}
    </div>
  );
};

export default Feedback;
