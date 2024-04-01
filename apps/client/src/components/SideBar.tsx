"use client"
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiVideoOn } from "react-icons/ci";
import { PiStudentBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard,  MdSettings, MdExitToApp } from "react-icons/md";
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { FaComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { IoMdSchool } from "react-icons/io";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data : session} = useSession()

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white">
      <Disclosure as="nav" className="h-full flex flex-col">
        {({ open }) => (
          <>
            <div className="flex justify-between items-center p-4">
              <IoMdSchool size={60} />
              <Disclosure.Button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring"
              >
                <GiHamburgerMenu className="h-6 w-6" />
              </Disclosure.Button>
            </div>
            <Disclosure.Panel className={`flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
              <NavItem icon={<MdDashboard />} label="Dashboard" href="/home" />
              <NavItem icon={<CgProfile />} label="Profile" href={`/profile/${session?.user.username}`} />
              <NavItem icon={<CiVideoOn  />} label="Video Rooms" href="/study" />
              <NavItem icon={<FaComments />} label="Chat Rooms" href="/chat" />
              <NavItem icon={<BiMessageSquareDots />} label="Study Goals" href="/todo" />
              <NavItem icon={<LeaderboardOutlinedIcon />} label="StudyStates" href="/states" />
              <NavItem icon={< PiStudentBold  />} label="leadearboard" href="/leaderboard" />
              <NavItem icon={<MdExitToApp />} label="Logout" href="/api/auth/signout"/>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default SideBar;
