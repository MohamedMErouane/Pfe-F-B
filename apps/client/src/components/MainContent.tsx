import React from "react";

const MainContent = () => {
  return (
    <div className="flex-1 h-screen bg-gradient-to-b from-pink-500 to-orange-500 text-white flex flex-col justify-center items-center">
      <div className="relative" style={{ top: '-60px', left: '140px' }}>
        <video
         muted 
          className="rounded-lg shadow-md"
          autoPlay
          loop
          controls
          width="640" 
          height="360" 
        >
          <source src="/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <button  
          className="absolute mt-8 px-4 py-2 bg-transparent border border-white rounded-full hover:bg-white hover:text-pink-500 transition-colors duration-300"
          style={{ top: 'calc(430px + 20px)', left: '225px' }}
        >
          Join Zoom Call
        </button>
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-center p-4" style={{ marginBottom: '-90px' }}>
          <p className="text-lg text-center">
            Join motivated students from all over the world in one of our group study rooms to boost your productivity and find your study flow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
