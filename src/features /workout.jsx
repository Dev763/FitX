import React, { useState } from "react";


function Workout() {
    const [open, setOpen] = useState(false);

       return(
        <div className="bg-gray-900 w-[45vw] h-[60vh] mx-auto rounded-xl mt-5">
           <h1 className="text-white justify-center flex p-5 text-xl">Start Workout</h1>
           <p className="ml-10 mt-7 text-sm">Quick Start</p>
           <button className="bg-blue-500 text-white h-[4vh] w-[10vw] rounded-xl ml-10 mt-2 cursor-pointer" 
            onClick={()=> setOpen(true)}   
        >Start an Empty Workout</button>
           <p className="mt-15 ml-10 ">Templates</p>

        {open && (
            <div className="fixed inset-0 bg-black/90 flex justify-center items-center" onClick={()=>setOpen(false)}>
             

               <div className="bg-zinc-900 text-white w-[30vw] h-[30vh] rounded-xl p-5">   
                
                <div className="flex justify-between">
                <h1 className="text-xl text-bold">New Workout</h1>
                <button className="cursor-pointer bg-white text-black h-[2vh] w-[1vw]"
                onClick={()=>setOpen(false)}>X</button>
                </div> 
             
              <button className="w-[26vw] h-7 rounded-lg cursor-pointer mt-10 ml-5 bg-blue-600 text-blue-300 font-bold">Add Exercises</button><br />
              <button className="w-[26vw] h-7 rounded-lg cursor-pointer mt-5 ml-5 bg-red-600 text-red-300 font-bold">Cancel Workout</button><br />
              <button className="w-[26vw] h-7 rounded-lg cursor-pointer mt-24 ml-5 bg-green-600 text-white font-bold">Finish</button>
            </div>
            
            </div>
        )}


           <div className="flex justify-end gap-3 mr-5">  
            <button className="cursor-pointer p-1 border rounded-lg border-white ">+ Templates</button>
            <button className="cursor-pointer p-1 border rounded-lg border-white">More</button>
           </div>
         <div className="flex gap-5 mt-15 ml-17 ">   
            <div className="h-44 w-40 border border-white rounded-xl cursor-pointer"></div>
           <div className="h-44 w-40 border border-white rounded-xl  cursor-pointer"></div>
           <div className="h-44 w-40 border border-white rounded-xl  cursor-pointer"></div>
           <div className="h-44 w-40 border border-white rounded-xl  cursor-pointer"></div>
           </div>
        
        </div>
       )
}

export default Workout