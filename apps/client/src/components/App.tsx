"use client"
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, ArchiveBoxIcon, Battery0Icon, BellIcon } from '@heroicons/react/24/outline';
import ConnectedUsers from './ConnectedUsers'; // Import the ConnectedUsers component
import PomodoroApp from './Pomodoro';
import Video from './Video';
import { FaPhoneSlash } from 'react-icons/fa';
import Image from 'next/image'; // Import Image component from Next.js
import BackgroundImage from '../../public/th8.jpg'; // Import the background image
import { ConnectedUser } from '@/lib/types';
import { BACKEND_URL } from '@/lib/Constants';
import io from 'socket.io-client';

interface Tab {
  id: number;
  title: string;
  icon: JSX.Element;
}

const App: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [clientStreams, setClientStreams] = useState<string[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [showConnectedUsers, setShowConnectedUsers] = useState<boolean>(false); // State to control visibility of ConnectedUsers component
  const [users, setUsers] = useState<ConnectedUser[]>([]);
  const tabs: Tab[] = [
    {
      id: 1,
      title: "Background",
      icon: <ArrowRightIcon className='w-5' />,
    },
    {
      id: 2,
      title: "Sound",
      icon: <ArchiveBoxIcon className='w-5' />,
    },
    {
      id: 3,
      title: "Motivational",
      icon: <Battery0Icon className='w-5' />,
    },
    {
      id: 4,
      title: "Test",
      icon: <BellIcon className='w-5' />,
    },
  ];

  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    newSocket.emit('findAllUsers', {}, (response : ConnectedUser[]) => {
      setUsers(response);
    });

    return () => {
      newSocket?.disconnect();
    };

  }, [users]);

  console.log(users)

  const addClientStream = (stream: string) => {
    setClientStreams(prevStreams => [...prevStreams, stream]);
  };

  const handleLeaveCall = () => {
    setConfirmDialog(true);
  };

  const handleConfirmLeave = () => {
    setConfirmDialog(false);
    window.location.href = '/home';
  };

  const handleCancelLeave = () => {
    setConfirmDialog(false);
  };

  const closeConnectedUsers = () => {
    setShowConnectedUsers(false); // Hide the ConnectedUsers component
    setSelectedTab(1); // Set the selected tab back to tab 1
  };

  const handleTabClick = (tabId: number) => {
    setSelectedTab(tabId);
    if (tabId === 2) {
      setShowConnectedUsers(true);
    } else {
      setShowConnectedUsers(false);
    }
  };

  return (
    <div className="relative">
      {confirmDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-8 rounded shadow-md">
            <p className="mb-4">Are you sure you want to leave the call?</p>
            <div className="flex justify-end">
              <button onClick={handleConfirmLeave} className="mr-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Yes</button>
              <button onClick={handleCancelLeave} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="text-white flex w-screen h-screen bg-black bg-opacity-50 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={BackgroundImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="brightness-75"
          />
        </div>

        <div className="w-1/4 h-full flex flex-col justify-between z-10">
          {/* Pomodoro Component */}
          <div className="h-1/2 p-3 flex items-center justify-center">
            <PomodoroApp />
          </div>

          {/* My camera stream */}
          <div className="h-1/2 p-3 flex items-center justify-center w-52 ml-10 mt-40">
            {/* <Video /> */}
          </div>
        </div>

        <div className="flex-1 h-full flex flex-col relative z-10">
          <div className="h-16 flex space-x-2 items-center justify-end pr-3">
            {tabs.map(tab => (
              <div
                className={`p-2 rounded-md ${selectedTab === tab.id ? 'bg-gray-600' : ''}`}
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.icon}
              </div>
            ))}
            {/* Leave button */}
            <div className="p-2 rounded-md bg-red-500 hover:bg-red-600" onClick={handleLeaveCall}>
              <FaPhoneSlash className="w-5" />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {/* My Video Component */}
            <div className="p-2 flex justify-center w-full mt-50">
              {/* <Video /> */}
              {/* <Video /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render connected users component */}
      {showConnectedUsers && <ConnectedUsers users={users} onClose={closeConnectedUsers} />}
    </div>
  );
}

export default App;
