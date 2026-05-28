import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getLast7DaysData } from "../utils/workoutStorage";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ─────────────────────────────────────────────────────────────────────────────
// AttendanceChart — bar chart of minutes trained per day (last 7 days).
// Data comes from workoutStorage (real localStorage data).
// Re-renders whenever a workout is saved via the "fitx_workout_saved" event.
// ─────────────────────────────────────────────────────────────────────────────

const AttendanceChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [totalMinutes, setTotalMinutes] = useState(0);

  const load = () => {
    const days = getLast7DaysData();   // [{ label: "Mon", minutes: 45 }, ...]
    const total = days.reduce((s, d) => s + d.minutes, 0);
    setTotalMinutes(total);
    setChartData({
      labels: days.map((d) => d.label),
      datasets: [
        {
          label: "Minutes Trained",
          data: days.map((d) => d.minutes),
          backgroundColor: days.map((d) =>
            d.minutes > 0 ? "#3b82f6" : "#374151"    // blue if trained, gray if rest
          ),
          borderRadius: 8,
        },
      ],
    });
  };

  useEffect(() => {
    load();
    window.addEventListener("fitx_workout_saved", load);
    return () => window.removeEventListener("fitx_workout_saved", load);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} min`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#9ca3af" },
        grid: { color: "#1f2937" },
      },
      x: {
        ticks: { color: "#9ca3af" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="p-4 mt-12 ml-4 bg-white rounded-xl shadow-md w-72">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold text-gray-900">Weekly Activity</h2>
        <span className="text-xs text-gray-500">{totalMinutes} min this week</span>
      </div>

      {totalMinutes === 0 && (
        <p className="text-xs text-gray-400 italic mb-2">
          No workouts this week yet. Log one to see data!
        </p>
      )}

      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AttendanceChart;