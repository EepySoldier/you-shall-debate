import './ChatInput.css';
import { useState, useRef, useEffect } from 'react';

type ChatInputProps = {
  onSend: (text: string) => void;
};

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSend(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !localStorage.getItem('modalOpen')) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (localStorage.getItem('modalOpen')) return;

      const target = e.target as HTMLElement;

      if (e.key === 'Escape') {
        inputRef.current?.blur();
        return;
      }

      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        return;
      }

      if (/^[\w\d]$/.test(e.key)) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  return (
    <div className="chat-input">
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="chat-input__field"
        ref={inputRef}
      />
      <button onClick={sendMessage} className="chat-input__send">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
