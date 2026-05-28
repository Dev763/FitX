import React, { useState, useEffect, useRef } from "react";
import { saveWorkout } from "../utils/workoutStorage";

// ── All available exercises, grouped by muscle group ─────────────────────────
const EXERCISES = {
  Chest: [
    "Bench Press", "Incline Bench Press", "Decline Bench Press",
    "Dumbbell Fly", "Cable Crossover", "Push-up", "Chest Dip",
  ],
  Back: [
    "Deadlift", "Pull-up", "Barbell Row", "Lat Pulldown",
    "Seated Cable Row", "T-Bar Row", "Single Arm Dumbbell Row",
  ],
  Legs: [
    "Squat", "Leg Press", "Romanian Deadlift", "Lunges",
    "Leg Curl", "Leg Extension", "Calf Raise", "Hip Thrust",
  ],
  Shoulders: [
    "Overhead Press", "Lateral Raise", "Front Raise",
    "Arnold Press", "Face Pull", "Upright Row", "Shrugs",
  ],
  Arms: [
    "Bicep Curl", "Hammer Curl", "Preacher Curl", "Concentration Curl",
    "Tricep Pushdown", "Skull Crushers", "Dips", "Close Grip Bench",
  ],
  Core: [
    "Plank", "Crunches", "Russian Twist", "Leg Raise",
    "Ab Wheel", "Cable Crunch", "Mountain Climbers", "Hanging Knee Raise",
  ],
};

const CATEGORIES = Object.keys(EXERCISES);

// Formats seconds → "MM:SS"
function fmt(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Workout() {
  // ── Workout session state ──
  const [started, setStarted]           = useState(false);
  const [exercises, setExercises]       = useState([]);   // selected exercises
  const [elapsed, setElapsed]           = useState(0);    // seconds
  const timerRef                        = useRef(null);

  // ── Exercise picker state ──
  const [showPicker, setShowPicker]     = useState(false);
  const [query, setQuery]               = useState("");
  const [activeCategory, setCategory]  = useState("Chest");

  // ── Timer: counts up while workout is active ──
  useEffect(() => {
    if (started) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started]);

  // ────────────────────────────────────────────────────────────────────────────
  // Workout lifecycle
  // ────────────────────────────────────────────────────────────────────────────
  const startWorkout = () => {
    setStarted(true);
    setElapsed(0);
    setExercises([]);
  };

  const cancelWorkout = () => {
    clearInterval(timerRef.current);
    setStarted(false);
    setExercises([]);
    setElapsed(0);
  };

  const finishWorkout = () => {
    // Only count sets the user ticked ✓
    const doneSets = exercises.flatMap((ex) => ex.sets.filter((s) => s.done));
    const totalVolume = doneSets.reduce(
      (sum, s) => sum + (parseFloat(s.kg) || 0) * (parseInt(s.reps) || 0),
      0
    );
    const workout = {
      id:          Date.now(),
      date:        new Date().toISOString().split("T")[0],
      dateDisplay: new Date().toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      }),
      duration:    Math.max(Math.ceil(elapsed / 60), 1),   // minutes, min 1
      exercises,
      totalSets:   doneSets.length,
      totalVolume,
    };
    saveWorkout(workout);   // → localStorage + dispatches "fitx_workout_saved"
    cancelWorkout();
  };

  // ────────────────────────────────────────────────────────────────────────────
  // Exercise management
  // ────────────────────────────────────────────────────────────────────────────

  // Add exercise from picker (ignore if already added)
  const addExercise = (name, category) => {
    if (exercises.find((e) => e.name === name)) return;
    setExercises((prev) => [
      ...prev,
      { name, category, sets: [{ kg: "", reps: "", done: false }] },
    ]);
    setShowPicker(false);
  };

  const removeExercise = (idx) =>
    setExercises((prev) => prev.filter((_, i) => i !== idx));

  // Add an empty set row to one exercise
  const addSet = (exIdx) =>
    setExercises((prev) =>
      prev.map((ex, i) =>
        i !== exIdx
          ? ex
          : { ...ex, sets: [...ex.sets, { kg: "", reps: "", done: false }] }
      )
    );

  // Update kg or reps for a specific set
  const updateSet = (exIdx, setIdx, field, value) =>
    setExercises((prev) =>
      prev.map((ex, i) =>
        i !== exIdx
          ? ex
          : {
              ...ex,
              sets: ex.sets.map((s, j) =>
                j !== setIdx ? s : { ...s, [field]: value }
              ),
            }
      )
    );

  // Tick/untick a set as done
  const toggleDone = (exIdx, setIdx) =>
    setExercises((prev) =>
      prev.map((ex, i) =>
        i !== exIdx
          ? ex
          : {
              ...ex,
              sets: ex.sets.map((s, j) =>
                j !== setIdx ? s : { ...s, done: !s.done }
              ),
            }
      )
    );

  // ────────────────────────────────────────────────────────────────────────────
  // Filtered exercises for picker
  // ────────────────────────────────────────────────────────────────────────────
  const filtered = query.trim()
    ? CATEGORIES.flatMap((cat) =>
        (EXERCISES[cat] || [])
          .filter((e) => e.toLowerCase().includes(query.toLowerCase()))
          .map((e) => ({ name: e, category: cat }))
      )
    : (EXERCISES[activeCategory] || []).map((e) => ({
        name: e,
        category: activeCategory,
      }));

  const doneCount = exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => s.done).length,
    0
  );

  // ────────────────────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-900 text-white w-full rounded-xl mt-5 p-5 min-h-[55vh] flex flex-col">

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Start Workout</h1>
        {started && (
          <span className="font-mono text-blue-400 text-lg tracking-widest bg-gray-800 px-3 py-1 rounded-lg">
            {fmt(elapsed)}
          </span>
        )}
      </div>

      {/* ── Idle state (workout not started) ── */}
      {!started ? (
        <>
          <p className="text-sm text-gray-400 mb-2">Quick Start</p>
          <button
            onClick={startWorkout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer w-fit"
          >
            Start an Empty Workout
          </button>

          <p className="text-sm text-gray-400 mt-6 mb-2">Templates</p>
          <div className="flex gap-3 flex-wrap">
            {["Push Day", "Pull Day", "Leg Day", "Full Body"].map((t) => (
              <div
                key={t}
                className="h-28 w-32 border border-white/20 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition flex items-end p-3 text-xs text-gray-400"
              >
                {t}
              </div>
            ))}
          </div>
        </>
      ) : (

        /* ── Active workout ── */
        <div className="flex flex-col gap-4 flex-1">

          {/* Progress bar (done sets / total sets) */}
          {exercises.length > 0 && (
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{doneCount} sets done</span>
                <span>{exercises.reduce((s, ex) => s + ex.sets.length, 0)} total sets</span>
              </div>
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: exercises.reduce((s, ex) => s + ex.sets.length, 0) > 0
                      ? `${(doneCount / exercises.reduce((s, ex) => s + ex.sets.length, 0)) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>
          )}

          {/* No exercises added yet */}
          {exercises.length === 0 && (
            <p className="text-gray-500 text-sm italic">
              Tap "+ Add Exercises" to get started.
            </p>
          )}

          {/* Exercise cards */}
          {exercises.map((ex, exIdx) => (
            <div key={exIdx} className="bg-gray-800 rounded-xl p-4">

              {/* Exercise header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-bold text-blue-400">{ex.name}</span>
                  <span className="ml-2 text-[10px] text-gray-500 bg-gray-700 px-2 py-0.5 rounded-full uppercase">
                    {ex.category}
                  </span>
                </div>
                <button
                  onClick={() => removeExercise(exIdx)}
                  className="text-red-400 text-xs hover:text-red-300 cursor-pointer"
                >
                  ✕ Remove
                </button>
              </div>

              {/* Set column headers */}
              <div className="grid grid-cols-4 gap-2 text-[10px] text-gray-500 mb-2 px-1 uppercase tracking-wide">
                <span>Set</span>
                <span>kg</span>
                <span>Reps</span>
                <span>✓</span>
              </div>

              {/* Set rows */}
              {ex.sets.map((set, setIdx) => (
                <div
                  key={setIdx}
                  className={`grid grid-cols-4 gap-2 items-center mb-2 px-1 py-1.5 rounded-lg transition-colors ${
                    set.done ? "bg-green-900/25 border border-green-700/30" : ""
                  }`}
                >
                  {/* Set number */}
                  <span className="text-sm font-bold text-gray-400">{setIdx + 1}</span>

                  {/* kg input */}
                  <input
                    type="number"
                    min="0"
                    value={set.kg}
                    onChange={(e) => updateSet(exIdx, setIdx, "kg", e.target.value)}
                    placeholder="0"
                    className="w-full bg-gray-700 rounded-lg p-1.5 text-sm text-center outline-none focus:ring-1 ring-blue-500 text-white"
                  />

                  {/* Reps input */}
                  <input
                    type="number"
                    min="0"
                    value={set.reps}
                    onChange={(e) => updateSet(exIdx, setIdx, "reps", e.target.value)}
                    placeholder="0"
                    className="w-full bg-gray-700 rounded-lg p-1.5 text-sm text-center outline-none focus:ring-1 ring-blue-500 text-white"
                  />

                  {/* Done checkbox */}
                  <input
                    type="checkbox"
                    checked={set.done}
                    onChange={() => toggleDone(exIdx, setIdx)}
                    className="w-5 h-5 accent-green-500 cursor-pointer"
                  />
                </div>
              ))}

              {/* Add set button */}
              <button
                onClick={() => addSet(exIdx)}
                className="mt-1 text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                + Add Set
              </button>
            </div>
          ))}

          {/* + Add Exercises button */}
          <button
            onClick={() => { setQuery(""); setShowPicker(true); }}
            className="w-full py-3 border border-dashed border-blue-500/60 text-blue-400 rounded-xl hover:bg-blue-500/10 transition cursor-pointer text-sm font-semibold"
          >
            + Add Exercises
          </button>

          {/* Finish / Cancel */}
          <div className="flex gap-3 mt-auto pt-2">
            <button
              onClick={finishWorkout}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Finish Workout
            </button>
            <button
              onClick={cancelWorkout}
              className="flex-1 border border-red-500/40 text-red-400 hover:bg-red-500/10 font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Exercise Picker Modal ── */}
      {showPicker && (
        <div
          className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4"
          onClick={() => setShowPicker(false)}
        >
          <div
            className="bg-zinc-900 rounded-2xl w-full max-w-md h-[75vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
              <h2 className="font-bold text-lg">Add Exercise</h2>
              <button
                onClick={() => setShowPicker(false)}
                className="text-gray-400 hover:text-white cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
              >
                ✕
              </button>
            </div>

            {/* Search bar */}
            <div className="px-4 py-3 border-b border-white/10 shrink-0">
              <input
                type="text"
                placeholder="Search exercises…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full bg-zinc-800 rounded-xl px-4 py-2.5 outline-none focus:ring-1 ring-blue-500 text-sm placeholder-gray-500"
              />
            </div>

            {/* Category pills (hidden during search) */}
            {!query.trim() && (
              <div className="flex gap-2 px-4 py-2.5 overflow-x-auto border-b border-white/10 shrink-0 scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                      activeCategory === cat
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Exercise list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {filtered.length === 0 && (
                <p className="text-gray-500 text-sm text-center mt-8">
                  No exercises found.
                </p>
              )}
              {filtered.map((ex, i) => {
                const already = !!exercises.find((e) => e.name === ex.name);
                return (
                  <button
                    key={i}
                    disabled={already}
                    onClick={() => addExercise(ex.name, ex.category)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition cursor-pointer flex items-center justify-between ${
                      already
                        ? "bg-green-900/30 text-green-400 cursor-not-allowed"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white"
                    }`}
                  >
                    <div>
                      <span className="font-semibold">{ex.name}</span>
                      {query.trim() && (
                        <span className="text-xs text-gray-500 ml-2">
                          {ex.category}
                        </span>
                      )}
                    </div>
                    {already && (
                      <span className="text-xs bg-green-800/50 px-2 py-0.5 rounded-full">
                        Added ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}