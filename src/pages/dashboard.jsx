import React, { useState } from "react";
import Navbar from "../components/navbar";
import Chart from "../features /chart";        
import Streak from "../features /streak";      
import Workout from "../features /workout";    
import History from "../features /history";   

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-800 text-white">
      <Navbar open={open} setOpen={setOpen} />

      {/* Hamburger toggle */}
      <button
        className="fixed top-4 left-2 z-50 bg-slate-900 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Main grid */}
      <main className="flex-1 grid grid-cols-4 ml-5 mt-4 content-start">

        {/* Row 1 */}
        <div className="col-span-2">
          <Workout />
        </div>
        <Chart />
        <Streak />

        {/* Row 3 — full-width history panel */}
        <History />

      </main>
    </div>
  );
};

export default Dashboard;