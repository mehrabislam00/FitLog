"use client";

import { useContext } from "react";
import type { Exercise } from "@/type/workoutType";
import { WorkoutContext } from "@/context/workoutContext";
import { LuBookmark } from 'react-icons/lu'

const Save = ({ workout }: { workout: Exercise }) => {
  const { SaveWorkout, setSaveWorkout } = useContext(WorkoutContext);
  const isSaved = SaveWorkout.some((item) => item.id === workout.id);

  const handleSave = () => {
    setSaveWorkout((current) =>
      isSaved
        ? current.filter((item) => item.id !== workout.id)
        : [...current, { ...workout, done: false }]
    );
  };

  return (
    <>
                  {/* Save for later */}
                  <button
                    className="flex items-center gap-2 rounded-xl border px-5 py-3
                               text-sm font-semibold text-white
                               transition-all duration-200 hover:border-[#CCFF00]/40 hover:text-[#CCFF00]
                               active:scale-95"
                    style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "transparent" }}
                    onClick={handleSave}
                    aria-pressed={isSaved}
                  >
                    <LuBookmark size={16} />
                    {isSaved ? "Saved" : "Save for later"}
                  </button>
    </>
  )
}

export default Save
