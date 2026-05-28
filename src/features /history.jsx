import React, { useState, useEffect } from "react";
import { getWorkoutHistory } from "../utils/workoutStorage";

// ─────────────────────────────────────────────────────────────────────────────
// History — lists all completed workouts from localStorage.
// Listens for "fitx_workout_saved" so it auto-refreshes when you finish a workout.
// Best placed in the dashboard as a full-width panel below the other widgets.
// ─────────────────────────────────────────────────────────────────────────────

export default function History() {
  const [history, setHistory] = useState([]);
  const [expanded, setExpanded] = useState(null);  // index of open card

  const load = () => setHistory(getWorkoutHistory());

  useEffect(() => {
    load();
    window.addEventListener("fitx_workout_saved", load);
    return () => window.removeEventListener("fitx_workout_saved", load);
  }, []);

  if (history.length === 0) {
    return (
      <div className="col-span-4 mx-4 mt-4 p-6 bg-gray-900 rounded-2xl text-gray-500 text-sm italic text-center">
        No workouts logged yet. Complete a workout to see your history here.
      </div>
    );
  }

  return (
    <div className="col-span-4 mx-4 mt-4 p-5 bg-gray-900 rounded-2xl">
      <h2 className="text-lg font-bold text-white mb-4">Workout History</h2>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {history.map((w, i) => (
          <div key={w.id} className="bg-gray-800 rounded-xl overflow-hidden">

            {/* Collapsed summary row — click to expand */}
            <button
              className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gray-750 transition"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              {/* Left: date + meta */}
              <div>
                <p className="font-bold text-white">{w.dateDisplay}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {w.exercises.length} exercise{w.exercises.length !== 1 ? "s" : ""}
                  {" · "}
                  {w.totalSets} set{w.totalSets !== 1 ? "s" : ""}
                  {" · "}
                  {w.duration} min
                </p>
              </div>

              {/* Right: volume + chevron */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-blue-400 font-bold">
                    {w.totalVolume.toLocaleString()} kg
                  </p>
                  <p className="text-[10px] text-gray-500">total volume</p>
                </div>
                <span className={`text-gray-500 transition-transform ${expanded === i ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </div>
            </button>

            {/* Expanded detail: exercises + sets */}
            {expanded === i && (
              <div className="border-t border-white/10 p-4 space-y-4">
                {w.exercises.map((ex, j) => {
                  const doneSets = ex.sets.filter((s) => s.done);
                  return (
                    <div key={j}>
                      {/* Exercise name */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-400 font-semibold text-sm">
                          {ex.name}
                        </span>
                        <span className="text-[10px] text-gray-500 bg-gray-700 px-2 py-0.5 rounded-full uppercase">
                          {ex.category}
                        </span>
                      </div>

                      {/* Set table header */}
                      <div className="grid grid-cols-3 text-[10px] text-gray-500 uppercase tracking-wide mb-1 px-1">
                        <span>Set</span>
                        <span>kg</span>
                        <span>Reps</span>
                      </div>

                      {/* Completed sets only */}
                      {doneSets.length === 0 ? (
                        <p className="text-xs text-gray-600 italic px-1">No sets completed</p>
                      ) : (
                        doneSets.map((s, k) => (
                          <div
                            key={k}
                            className="grid grid-cols-3 text-sm text-gray-300 px-1 py-0.5"
                          >
                            <span className="text-gray-500">{k + 1}</span>
                            <span>{s.kg || 0}</span>
                            <span>{s.reps || 0}</span>
                          </div>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}