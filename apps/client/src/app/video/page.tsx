"use client"
import React, { useEffect, useRef, useState } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import io from 'socket.io-client';

const VideoChat = () => {
  const videoGridRef = useRef<HTMLDivElement>(null);
  const myPeer = useRef<Peer | null>(null);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const peers = useRef<{ [key: string]: MediaConnection }>({});
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    const socket = io('/');
    const videoGrid = videoGridRef.current;

    // Fetch room ID from server
    const fetchRoomId = async () => {
      const response = await fetch('/api/stream', { method: 'POST' });
      const { roomId } = await response.json();
      setRoomId(roomId);
    };

    fetchRoomId();

    myPeer.current = new Peer();

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      addVideoStream(myVideoRef.current!, stream);

      // When a new user connects, call them and send your stream
      myPeer.current!.on('call', (call: MediaConnection) => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', (userVideoStream: MediaStream) => {
          addVideoStream(video, userVideoStream);
        });
        call.on('close', () => {
          video.remove();
        });
      });

      // When a new user joins, call them and send your stream
      socket.on('user-connected', (userId: string) => {
        setTimeout(() => { // Timeout to ensure myVideo is added before calling
          const call = myPeer.current!.call(userId, stream);
          const video = document.createElement('video');
          call.on('stream', (userVideoStream: MediaStream) => {
            addVideoStream(video, userVideoStream);
          });
          call.on('close', () => {
            video.remove();
          });
          peers.current[userId] = call;
        }, 1000);
      });

    });

    // When a user disconnects, remove their video stream
    socket.on('user-disconnected', (userId: string) => {
      if (peers.current[userId]) {
        peers.current[userId].close();
        delete peers.current[userId];
      }
    });

    // When Peer connection is established, join the room
    myPeer.current!.on('open', id => {
      socket.emit('join-room', roomId, id);
    });

    // Function to add video stream to the grid
    function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      videoGrid!.append(video);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <div ref={videoGridRef}></div>
      <video ref={myVideoRef} muted></video>
      {roomId && (
        <div>
          <p>Share this link with others to join the room:</p>
          <input type="text" value={`${window.location.origin}/room/${roomId}`} readOnly />
        </div>
      )}
    </div>
  );
};

export default VideoChat;
