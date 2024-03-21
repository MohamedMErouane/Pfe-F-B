"use client"

import SideBar from "@/components/SideBar";
import LeaderboardPage from "../../components/LeaderboardPage";

function App() {
  return (
    <div className="flex">
      <div className="w-64"> {/* This div will take up 256px in width */}
        <SideBar />
      </div>
      <div className="flex-grow mx-4"> {/* This div will take up the remaining space */}
        <LeaderboardPage />
      </div>
    </div>
  );
}

export default App;
