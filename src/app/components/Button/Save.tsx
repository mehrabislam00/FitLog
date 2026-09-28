"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import type { Exercise } from "@/type/workoutType";
import { WorkoutContext } from "@/context/workoutContext";
import { LuBookmark } from 'react-icons/lu'

const Save = ({ workout }: { workout: Exercise }) => {
  const router = useRouter();
  const { SaveWorkout, setSaveWorkout } = useContext(WorkoutContext);
  const isSaved = SaveWorkout.some((item) => item.id === workout.id);

  // Save once, then open the saved-workouts tab.
  const handleSave = () => {
    if (!isSaved) {
      setSaveWorkout((current) =>
        current.some((item) => item.id === workout.id)
          ? current
          : [...current, { ...workout, done: false }]
      );
    }

    router.push("/myplan#saved");
  };

  return (
    <>
      {/* Save action */}
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
