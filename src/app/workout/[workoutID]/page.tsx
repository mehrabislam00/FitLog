import { Exercise } from "@/type/workoutType";
import Link from "next/link";
import React from "react";

interface WorkOutIdProps {
  params: Promise<{
    WorkoutID: string;
  }>;
}
const getWorkout = async (): Promise<Exercise[]> => {
  const res = await fetch("https://api.api-store.workers.dev/api/fitlog");

  if (!res.ok) {
    throw new Error("Failed to fetch Exercise");
  }

  return res.json();
};

 


const WorkOutDetails = async ({params} : WorkOutIdProps) => {

  
   const {WorkoutID} = await params ;
   const workoutData = await getWorkout ();
   const workout = workoutData.find((workout : Exercise)=> String( workout.id) === String(WorkoutID) )

 if (!workout) {
   return (
     <main className="container mx-auto px-4 py-20 text-center sm:px-6">
       <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Workout unavailable</p>
       <h1 className="mt-3 text-3xl font-extrabold">We couldn&apos;t find that Workout</h1>
       <Link href="/" className="btn btn-primary mt-6 rounded-full px-6">Back to Home</Link>
     </main>
   );
 }



  return <div>pageeee</div>;
};

export default WorkOutDetails;
