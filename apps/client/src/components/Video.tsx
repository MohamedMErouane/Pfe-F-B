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

      socket.on('user-connected', (userId: string) => {
        setTimeout(() => {
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

    socket.on('user-disconnected', (userId: string) => {
      if (peers.current[userId]) {
        peers.current[userId].close();
        delete peers.current[userId];
      }
    });

    myPeer.current!.on('open', id => {
      socket.emit('join-room', roomId, id);
    });

    function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      videoGridRef.current!.append(video);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="video-chat-container">
      <div ref={videoGridRef} className="video-grid"></div>
      <video ref={myVideoRef} muted className="my-video"></video>
      {roomId && (
        <div>
          <p>Share this link with others to join the room:</p>
          <input type="text" value={`${window.location.origin}/room/${roomId}`} readOnly />
        </div>
      )}
      <style jsx>{`
        .video-chat-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content:space-between;
          padding:7px;
          margin-top:-50px;
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
        }
        .my-video {
          border-radius: 10px;
          width: 350px;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default VideoChat;
