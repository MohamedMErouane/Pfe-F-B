// pages/index.tsx


import React from "react";
import SideBar from "../../components/SideBar";
import MainContent from "../../components/MainContent";

const HomePage = () => {
  return (
    <>
    <SideBar />
    <div className="flex">
      <MainContent />
    </div>
    </>
  );
};

export default HomePage;
