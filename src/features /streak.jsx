import React, { useState, useEffect } from "react";
import {
  getLast30DaysActivity,
  getThisWeekActivity,
  getCurrentStreak,
} from "../utils/workoutStorage";

// ─────────────────────────────────────────────────────────────────────────────
// Streak — shows current streak, 30-day grid, and this-week view.
// All data is real (from workoutStorage / localStorage).
// Refreshes automatically when a workout is saved.
// ─────────────────────────────────────────────────────────────────────────────

const Streak = () => {
  const [activity30, setActivity30]   = useState([]);  // [1,0,1,...] 30 items
  const [thisWeek, setThisWeek]       = useState([]);  // [{label,isToday,worked}] 7 items
  const [streak, setStreak]           = useState(0);

  const load = () => {
    setActivity30(getLast30DaysActivity());
    setThisWeek(getThisWeekActivity());
    setStreak(getCurrentStreak());
  };

  useEffect(() => {
    load();
    window.addEventListener("fitx_workout_saved", load);
    return () => window.removeEventListener("fitx_workout_saved", load);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl max-w-sm ml-12 mt-25 text-black">

      {/* ── Header: streak count + today's date ── */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-slate-900 text-sm font-bold uppercase tracking-tight">
            Current Streak
          </h2>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-5xl font-black text-orange-500 italic leading-none">
              {streak}
            </span>
            <span className="text-xl font-bold uppercase">Days</span>
            <span className="text-2xl ml-1">🔥</span>
          </div>
          {streak === 0 && (
            <p className="text-xs text-slate-400 mt-1 italic">
              Log a workout to start your streak!
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-500 uppercase">Today</p>
          <p className="text-sm font-black text-slate-700">{today}</p>
        </div>
      </div>

      {/* ── 30-Day Activity Grid ── */}
      <div className="mb-6">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
          Last 30 Days
        </p>
        <div className="flex flex-wrap gap-1.5">
          {activity30.map((active, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm transition-colors ${
                active ? "bg-orange-500" : "bg-slate-200"
              }`}
              title={active ? "Workout logged" : "Rest day"}
            />
          ))}
        </div>
      </div>

      {/* ── This Week (M–Su) ── */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 text-center">
          This Week
        </p>
        <div className="flex justify-between items-center">
          {thisWeek.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400">{day.label}</span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  day.isToday
                    ? "ring-2 ring-orange-500 ring-offset-2 bg-orange-500 text-white"
                    : day.worked
                    ? "bg-orange-200 text-orange-700"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {day.worked ? "✓" : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Streak;