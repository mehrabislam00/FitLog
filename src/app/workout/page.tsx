import React from "react";
import WorkoutCard from "../components/card/WorkoutCard";
import { Exercise } from "@/type/workoutType";





const getWorkout = async (): Promise<Exercise[]> => {
  const res = await fetch("https://api.api-store.workers.dev/api/fitlog");

  if (!res.ok) {
    throw new Error("Failed to fetch Exercise");
  }

  return res.json();
};


// ── Page ───────────────────────────────────────────────────
const WorkOut = async () => {
  
  const workoutData = await getWorkout ();

  return (
    <main
      id="libraries"
      className="min-h-screen px-5 py-10 sm:px-8 scroll-mt-28"
      style={{ backgroundColor: "#0C0D10" }}
    >
      <div className="container mx-auto ">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            The Library
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9CA3AF" }}>
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {workoutData.map((workout) => 
            {
                return <WorkoutCard key={workout.id} workout = {workout}/> 
            }
        
        )}
        </div>

      </div>
    </main>
  );
};

export default WorkOut;