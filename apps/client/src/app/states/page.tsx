"use client"

import ChartComponent from "../../components/Chart";

import SideBar from "@/components/SideBar";


function App() {
  return (
    <div className="flex">
      <div className="w-64"> {/* This div will take up 256px in width */}
        <SideBar />
      </div>
      <div className="flex-grow mx-4"> {/* This div will take up the remaining space */}
        <ChartComponent/>
      </div>
    </div>
  );
}

export default App;