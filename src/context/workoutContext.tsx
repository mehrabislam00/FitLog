"use client";

import { Exercise } from "@/type/workoutType";
import { createContext, startTransition, useEffect, useState, type ReactNode } from "react";

export type PlannedWorkout = Exercise & { done: boolean };

interface WorkoutContextValue {
  PlanWorkout: PlannedWorkout[];
  setPlanWorkout: React.Dispatch<React.SetStateAction<PlannedWorkout[]>>;
  SaveWorkout: PlannedWorkout[];
  setSaveWorkout: React.Dispatch<React.SetStateAction<PlannedWorkout[]>>;
}

export const WorkoutContext = createContext<WorkoutContextValue>({
  PlanWorkout: [],
  setPlanWorkout: () => undefined,
  SaveWorkout: [],
  setSaveWorkout: () => undefined,
});

const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [PlanWorkout, setPlanWorkout] = useState<PlannedWorkout[]>([]);
  const [SaveWorkout, setSaveWorkout] = useState<PlannedWorkout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-today-plan");
      const storedSaved = localStorage.getItem("fitlog-saved-workouts");

      const plan = storedPlan ? JSON.parse(storedPlan) as PlannedWorkout[] : [];
      const saved = storedSaved ? JSON.parse(storedSaved) as PlannedWorkout[] : [];

      startTransition(() => {
        setPlanWorkout(plan);
        setSaveWorkout(saved);
        setLoaded(true);
      });
    } catch {
      localStorage.removeItem("fitlog-today-plan");
      localStorage.removeItem("fitlog-saved-workouts");
      startTransition(() => setLoaded(true));
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-today-plan", JSON.stringify(PlanWorkout));
    localStorage.setItem("fitlog-saved-workouts", JSON.stringify(SaveWorkout));
  }, [loaded, PlanWorkout, SaveWorkout]);

  const sharedData = {
    PlanWorkout,
    setPlanWorkout,
    SaveWorkout,
    setSaveWorkout,
  };

  return (
    <WorkoutContext.Provider value={sharedData}>{children}</WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
