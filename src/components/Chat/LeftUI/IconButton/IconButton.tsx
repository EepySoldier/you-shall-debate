import './IconButton.css';
import { JSX } from 'react';
import { useState } from 'react';
import Modal from './Modal/Modal';

type IconButtonProps = {
  icon: JSX.Element;
  children: React.ReactNode;
};

const IconButton = ({ icon, children }: IconButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="ui-button" onClick={() => setIsOpen(true)}>
        <span className="ui-button__icon">{icon}</span>
      </button>

      {isOpen && <Modal onClose={() => setIsOpen(false)}>{children}</Modal>}
    </>
  );
};

export default IconButton;
