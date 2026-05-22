import React from 'react';

const Streak = () => {
  // 1 = Workout, 0 = Rest. Last 30 days of data.
  const activityData = [
    1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 
    1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1
  ];
  
  const currentStreak = 12; // Dynamic calculation logic would go here
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });

  return (
    <div className="p-6 bg-white white:bg-slate-900 rounded-3xl shadow-xl max-w-md ml-12 mt-25 text-black">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-slate-900 dark:text-slate-900 text-sm font-bold uppercase tracking-tight">Current Streak</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-orange-500 italic leading-none">{currentStreak}</span>
            <span className="text-xl font-bold dark:text-white uppercase">Days</span>
            <span className="text-2xl ml-1">🔥</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-900 uppercase">Today</p>
          <p className="text-sm font-black dark:text-slate-200">{today}</p>
        </div>
      </div>

      {/* 30-Day Activity Grid (Mini) */}
      <div className="mb-6">
        <p className="text-[10px] font-bold text-slate-900 uppercase mb-2">Last 30 Days</p>
        <div className="flex flex-wrap gap-1.5">
          {activityData.map((active, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-sm ${active ? 'bg-orange-500' : 'bg-slate-900 dark:bg-slate-800'}`}
            />
          ))}
        </div>
      </div>

      {/* Current Week Focus */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 text-center">This Week</p>
        <div className="flex justify-between items-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold dark:text-slate-500">{day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${i === 6 // Assuming Sunday is today for this example
                  ? 'ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-slate-900 bg-orange-500 text-white' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'}`}
              >
                {i === 6 ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Streak;