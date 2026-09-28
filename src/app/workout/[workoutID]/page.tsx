import Save from "@/app/components/Button/Save";
import TodayPlan from "@/app/components/Button/TodayPlan";
import { Exercise } from "@/type/workoutType";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  LuDumbbell,
  LuZap,
  LuRepeat2,
  LuClock,
  LuFlame,
  LuStar,

} from "react-icons/lu";
import { MdOutlineAddTask } from "react-icons/md";

interface WorkOutIdProps {
  params: Promise<{ workoutID: string }>;
}

const getWorkout = async (): Promise<Exercise[]> => {
  const res = await fetch("https://api.api-store.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Exercise");
  return res.json();
};

// ── Info row data ──────────────────────────────────────────
const infoRows = (w: Exercise) => [
  { icon: <LuDumbbell  size={14} />, label: "Equipment", value: w.equipment             },
  { icon: <LuZap       size={14} />, label: "Difficulty", value: w.difficulty            },
  { icon: <MdOutlineAddTask size={14}/>, label: "Sets",       value: String(w.sets)          },
  { icon: <LuRepeat2   size={14} />, label: "Reps",       value: w.reps                  },
  { icon: <LuClock     size={14} />, label: "Duration",   value: `${w.duration} min`     },
  { icon: <LuFlame     size={14} />, label: "Calories",   value: `${w.caloriesBurned} kcal` },
  { icon: <LuStar      size={14} />, label: "Rating",     value: String(w.rating)        },
];

// ── Page ───────────────────────────────────────────────────
const WorkOutDetails = async ({ params }: WorkOutIdProps) => {
  const { workoutID } = await params;
  const workoutData   = await getWorkout();
  const workout       = workoutData.find(
    (w: Exercise) => String(w.id) === workoutID
  );

  if (!workout) {
    return (
      <main
        className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
        style={{ backgroundColor: "#0C0D10" }}
      >
        <p
          className="text-xs font-black uppercase tracking-[0.22em]"
          style={{ color: "#CCFF00" }}
        >
          Workout unavailable
        </p>
        <h1 className="mt-3 text-3xl font-black uppercase text-white">
          We couldn&apos;t find that workout
        </h1>
        <Link
          href="/"
          className="mt-6 rounded-full px-6 py-3 text-sm font-black uppercase tracking-wider"
          style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
        >
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-5 py-12 sm:px-8"
      style={{ backgroundColor: "#0C0D10" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">

          {/* ── Left: Image ── */}
          <div className="relative w-full overflow-hidden rounded-2xl"
               style={{ minHeight: "480px" }}>
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ── Right: Details ── */}
          <div className="flex flex-col">

            {/* Title */}
            <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-[2.6rem]">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
              {workout.description}
            </p>

            {/* Muscle group tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((mg) => (
                <span
                  key={mg}
                  className="rounded-full px-3.5 py-1.25 text-[11px] font-black uppercase tracking-wider"
                  style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
                >
                  {mg}
                </span>
              ))}
            </div>

            {/* ── Info table ── */}
            <div
              className="mt-6 overflow-hidden rounded-xl border border-white/6"
              style={{ backgroundColor: "#111214" }}
            >
              {infoRows(workout).map(({ icon, label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-5 py-3.5 ${
                    i > 0 ? "border-t border-white/6" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#9CA3AF" }}>{icon}</span>
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.14em]"
                      style={{ color: "#9CA3AF" }}
                    >
                      {label}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>

            {/* ── Instructions ── */}
            <div className="mt-7">
              <h2
                className="mb-4 text-[11px] font-black uppercase tracking-[0.2em]"
                style={{ color: "#CCFF00" }}
              >
                Instructions
              </h2>
              <ol className="space-y-2.5">
                {workout.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span
                      className="shrink-0 font-black"
                      style={{ color: "#CCFF00" }}
                    >
                      {i + 1}.
                    </span>
                    <span style={{ color: "#9CA3AF" }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* ── Action buttons ── */}
            <div className="mt-8 flex flex-wrap gap-3">
              {/* Add to today's plan */}
             <TodayPlan workout = {workout} />

              {/* Save for later */}
          <Save workout={workout} />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkOutDetails;