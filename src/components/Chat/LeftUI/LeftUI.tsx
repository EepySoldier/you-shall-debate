import './LeftUI.css';
import { VscFeedback } from 'react-icons/vsc';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { ImHammer2 } from 'react-icons/im';
import IconButton from './IconButton/IconButton';
import FAQ from './FAQ/FAQ';
import Feedback from './Feedback/Feedback';
import VotingManager from './VotingManager/VotingManager';

const LeftUI = () => {
  return (
    <div className="left-ui">
      <IconButton icon={<MdOutlineQuestionMark />}>
        <FAQ />
      </IconButton>
      <IconButton icon={<VscFeedback />}>
        <Feedback />
      </IconButton>
      <IconButton icon={<ImHammer2 />}>
        <VotingManager />
      </IconButton>
    </div>
  );
};

export default LeftUI;
