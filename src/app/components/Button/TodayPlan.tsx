"use client"

import { WorkoutContext } from '@/context/workoutContext'
import { Exercise } from '@/type/workoutType'
import { useContext } from 'react'
import { MdOutlineAddTask } from 'react-icons/md'
import { toast } from 'react-toastify'





const TodayPlan = ({ workout }: { workout: Exercise }) => {
  const { PlanWorkout, setPlanWorkout } = useContext(WorkoutContext);
  const isAdded = PlanWorkout.some((item) => item.id === workout.id);
  const isAtCapacity = PlanWorkout.length >= 5;

  // Add the workout only when it fits today's plan.
  const handleTodayPlan = () => {
    if (isAdded || isAtCapacity) return;
    setPlanWorkout((current) => [...current, { ...workout, done: false }]);
    toast.success("Added to today's plan", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };


  return (
    <>
     {/* Today's plan action */}
                  <button
                   
                    className="flex items-center gap-2 rounded-xl px-5 py-3
                               text-sm font-black uppercase tracking-wide
                               transition-all duration-200 hover:brightness-110 active:scale-95
                               shadow-[0_0_24px_rgba(204,255,0,0.25)]"
                    style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
                    onClick={handleTodayPlan}
                    disabled={isAdded || isAtCapacity}
                    aria-pressed={isAdded}
                  >
                    <MdOutlineAddTask size={16} />
                    {isAdded ? "Added to today's plan" : isAtCapacity ? "Plan is full" : "Add to today's plan"}
                  </button>
    </>
  )
}

export default TodayPlan
