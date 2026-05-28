// ─── workoutStorage.js ───────────────────────────────────────────────────────
// All read/write to localStorage lives here.
// Every component imports from this file — never touches localStorage directly.
// ─────────────────────────────────────────────────────────────────────────────

const KEY = "fitx_history";

// ── Saved workout shape ───────────────────────────────────────────────────────
// {
//   id:          number   (Date.now())
//   date:        string   ("2026-05-22")
//   dateDisplay: string   ("May 22, 2026")
//   duration:    number   (minutes)
//   exercises: [
//     { name, category, sets: [{ kg, reps, done }] }
//   ]
//   totalSets:   number   (only done sets)
//   totalVolume: number   (kg × reps, done sets only)
// }
// ─────────────────────────────────────────────────────────────────────────────

/** Return all saved workouts (newest first). */
export function getWorkoutHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

/** Save a finished workout. Prepends so newest is [0]. */
export function saveWorkout(workout) {
  const history = getWorkoutHistory();
  history.unshift(workout);
  localStorage.setItem(KEY, JSON.stringify(history));
  // Notify chart, streak, history that new data is ready.
  window.dispatchEvent(new Event("fitx_workout_saved"));
}

// ── Chart data ────────────────────────────────────────────────────────────────
/** Returns last 7 days as [{ label: "Mon", minutes: 45 }, ...]. */
export function getLast7DaysData() {
  const history = getWorkoutHistory();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));          // oldest → newest
    const dateStr = d.toISOString().split("T")[0];
    const label = d.toLocaleDateString("en-US", { weekday: "short" });
    const minutes = history
      .filter((w) => w.date === dateStr)
      .reduce((sum, w) => sum + (w.duration || 0), 0);
    return { label, minutes };
  });
}

// ── Streak data ───────────────────────────────────────────────────────────────
/** Returns last 30 days as [1, 0, 1, ...] (1 = worked out, 0 = rest). */
export function getLast30DaysActivity() {
  const history = getWorkoutHistory();
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const dateStr = d.toISOString().split("T")[0];
    return history.some((w) => w.date === dateStr) ? 1 : 0;
  });
}

/** Returns "this week" array for M-Su: [{ day, worked }]. */
export function getThisWeekActivity() {
  const history = getWorkoutHistory();
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  // Monday = 0 index.  JS Sunday = 0, so shift.
  const todayJS = new Date().getDay();               // 0=Sun … 6=Sat
  const todayIdx = (todayJS + 6) % 7;               // 0=Mon … 6=Sun

  return days.map((label, i) => {
    const offset = i - todayIdx;                     // negative = past
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const dateStr = d.toISOString().split("T")[0];
    return {
      label,
      isToday: i === todayIdx,
      worked: history.some((w) => w.date === dateStr),
    };
  });
}

/** Count consecutive days ending today (or yesterday if today not done yet). */
export function getCurrentStreak() {
  const history = getWorkoutHistory();
  if (!history.length) return 0;
  let streak = 0;
  const check = new Date();
  while (true) {
    const dateStr = check.toISOString().split("T")[0];
    if (history.some((w) => w.date === dateStr)) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}