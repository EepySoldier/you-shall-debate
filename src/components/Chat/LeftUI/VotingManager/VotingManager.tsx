import './VotingManager.css';
import { useEffect, useState } from 'react';
import socket from '../../../../socket';

const VotingManager = () => {
  const [whichActive, setWhichActive] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [users, setUsers] = useState<string[]>(['Select User']);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>(users[0]);

  useEffect(() => {
    socket.emit('fetchData');

    const fetchData = (userList: string[]) => {
      const list = [users[0], ...userList];
      setUsers(list);
    };

    socket.on('roomData', fetchData);

    return () => {
      socket.off('roomData', fetchData);
    };
  }, []);

  const handleVote = () => {
    if (whichActive && selectedUser !== users[0]) {
      socket.emit('startUserVote', selectedUser);
      setFormSubmitted(true);
    } else if (!whichActive && selectedTopic !== '') {
      socket.emit('startTopicVote', selectedTopic);
      setFormSubmitted(true);
    }
  };

  return (
    <div className="voting-manager">
      <h1 className="voting-manager__title">Voting Manager</h1>

      {formSubmitted ? (
        <h2>Vote in progress!</h2>
      ) : (
        <>
          <div className="voting-manager__categories">
            <button
              onClick={() => setWhichActive(true)}
              className={`voting-manager__category ${whichActive ? 'active' : ''}`}
            >
              User
            </button>
            <button
              onClick={() => setWhichActive(false)}
              className={`voting-manager__category ${!whichActive ? 'active' : ''}`}
            >
              Topic
            </button>
          </div>

          <div className="voting-manager__form">
            {whichActive ? (
              <>
                <label htmlFor="username">Username to vote kick:</label>
                <select
                  id="username"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  {users.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <button onClick={handleVote} className="voting-manager__startBtn">
                  Start Kick Vote
                </button>
              </>
            ) : (
              <>
                <label htmlFor="topic">Suggested New Topic:</label>
                <input
                  type="text"
                  placeholder="Enter new topic..."
                  minLength={3}
                  maxLength={450}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                />
                <button onClick={handleVote} className="voting-manager__startBtn">
                  Start Topic Vote
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VotingManager;
