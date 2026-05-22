import React, {useState} from "react";
import Navbar from "../components/navbar";
import Chart from "../features /chart";
import Streak from "../features /streak";
import Routine from "../features /routine";
import Feedback from "../features /feedback";
import Workout from "../features /workout";


const Dashboard = () => {
  const [open, setOpen] = useState(false);
  return (
<div className="flex min-h-screen bg-zinc-800 text-white">
        <Navbar open={open} setOpen={setOpen} />
      <button        
      className="fixed top-4 left-2 z-50 bg-slate-900 text-white px-4 py-2 rounded-md cursor-pointer"
      onClick={()=>setOpen(!open)}>☰</button>

 <main className=" flex-1 grid grid-cols-4 ml-5 ">
      <div className="col-span-2"><Workout/></div>
      <Chart />
      <Streak />
      <Routine />
      <Feedback />
</main>
</div>

);
};

export default Dashboard;