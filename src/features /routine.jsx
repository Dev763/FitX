import React, { useState } from 'react';

const Routine = () => {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Bench Press', sets: '3x10', done: false },
    { id: 2, name: 'Deadlift', sets: '5x5', done: true },
  ]);
  const [newEx, setNewEx] = useState('');

  const addWorkout = () => {
    if (!newEx) return;
    setWorkouts([...workouts, { id: Date.now(), name: newEx, sets: '3x12', done: false }]);
    setNewEx('');
  };

  const toggleDone = (id) => {
    setWorkouts(workouts.map(w => w.id === id ? { ...w, done: !w.done } : w));
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 mt-5 ml-8">
      <h3 className="text-xl font-black mb-4 dark:text-white">Today's Routine</h3>
      
      {/* Input Field */}
      <div className="flex gap-2 mb-6">
        <input 
          value={newEx} 
          onChange={(e) => setNewEx(e.target.value)}
          placeholder="Add exercise..."
          className="flex-1 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl dark:text-white outline-none focus:ring-2 ring-blue-500"
        />
        <button onClick={addWorkout} className="bg-blue-600 text-white px-5 rounded-xl font-bold hover:bg-blue-700 transition">+</button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {workouts.map(w => (
          <div key={w.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={w.done} onChange={() => toggleDone(w.id)} className="w-5 h-5 accent-blue-600" />
              <span className={`font-bold ${w.done ? 'line-through text-slate-400' : 'dark:text-white'}`}>{w.name}</span>
            </div>
            <span className="text-xs font-black text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">{w.sets}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routine;