import React from 'react';

interface User {
  id: number;
  username: string;
  imageUrl: string;
  connected: boolean;
}

interface Props {
  users: User[];
  onClose: () => void;
}

const ConnectedUsers: React.FC<Props> = ({ users, onClose }) => {
  const connectedUsers = users.filter(user => user.connected);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50 overflow-hidden">
      <div className="p-12 bg-gray-900 rounded-lg text-white max-h-96 overflow-y-auto scrollbar-hide">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">Connected Users</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="space-y-4">
          {connectedUsers.map(user => (
            <li key={user.id} className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                {user.connected && <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <circle cx="10" cy="10" r="10" />
                </svg>}
              </div>
              <img src={user.imageUrl} alt={user.username} className="w-12 h-12 rounded-full mr-4" />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConnectedUsers;