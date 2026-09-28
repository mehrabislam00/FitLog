import React from "react";
import WorkoutCard from "../components/card/WorkoutCard";
import { Exercise } from "@/type/workoutType";





// Fetch data for the workout library.
const getWorkout = async (): Promise<Exercise[]> => {
  const configuredApiBaseUrl = process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim();
  const apiBaseUrl =
    configuredApiBaseUrl && configuredApiBaseUrl !== "undefined"
      ? configuredApiBaseUrl
      : "https://api.api-store.workers.dev";
  const res = await fetch(`${apiBaseUrl}/api/fitlog`);

  if (!res.ok) {
    throw new Error("Failed to fetch Exercise");
  }

  return res.json();
};


// Render the workout library page.
const WorkOut = async () => {
  
  const workoutData = await getWorkout ();

  return (
    <main
      id="libraries"
      className="min-h-screen scroll-mt-28 px-3 py-8 sm:px-8 sm:py-10"
      style={{ backgroundColor: "#0C0D10" }}
    >
      <div className="container mx-auto ">

        {/* Library heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            The Library
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9CA3AF" }}>
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout card grid */}
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