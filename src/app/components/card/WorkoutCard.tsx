"use client";

import Image from "next/image";
import Link from "next/link";
import { LuClock, LuFlame, LuStar, LuChevronRight } from "react-icons/lu";
import type { Exercise } from "@/type/workoutType";

type WorkoutCardProps = { workout: Exercise };

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-[22px]
                 border border-white/6
                 transition-all duration-500 ease-out
                 hover:-translate-y-1.5
                 hover:border-[#CCFF00]/20
                 hover:shadow-[0_24px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(204,255,0,0.07)]"
      style={{ backgroundColor: "#111214" }}
    >
      {/* ── Image ── */}
      <div className="relative h-52.5 w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc((100vw - 64px) / 2), (max-width: 1279px) calc((100vw - 64px) / 3), 400px"
          priority
          className="object-cover transition-all duration-500 ease-in-out
                     group-hover:scale-[1.08] group-hover:blur-md"
        />

        {/* Hover content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3
                     opacity-0 transition-opacity duration-300 delay-75
                     group-hover:opacity-100"
        >
          {/* CTA button — LuChevronRight replaces broken LuArrowRight */}
          <div className="translate-y-4 transition-transform duration-300 ease-out group-hover:translate-y-0">
            <Link
              href={`/workout/${workout.id}`}
              className="flex items-center gap-2 rounded-full px-5 py-2.5
                         text-[11px] font-black uppercase tracking-widest
                         shadow-[0_0_28px_rgba(204,255,0,0.5)]
                         transition-transform duration-150 active:scale-95"
              style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            >
              View Workout
              <LuChevronRight className="" size={14} strokeWidth={2.5} />
            </Link>
          </div>

          {/* Stats chip */}
          <div
            className="translate-y-4 transition-transform duration-300 ease-out delay-75
                       group-hover:translate-y-0
                       flex items-center gap-2 rounded-full px-4 py-1.5
                       text-[10px] font-semibold border backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(0,0,0,0.35)",
              borderColor: "rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <span className="flex items-center gap-1">
              <LuClock size={12} /> {workout.duration} min
            </span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1">
              <LuFlame size={12} /> {workout.caloriesBurned} kcal
            </span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1 font-bold" style={{ color: "#CCFF00" }}>
              <LuStar size={12} /> {workout.rating}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-5 pb-5 pt-4">
        <div className="mb-3.5 flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-0.75 text-[10px] font-black uppercase tracking-wider
                         transition-shadow duration-300
                         group-hover:shadow-[0_0_12px_rgba(204,255,0,0.3)]"
              style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h2
          className="mb-1 text-[1.05rem] font-black uppercase leading-tight tracking-tight text-white
                     transition-colors duration-300 group-hover:text-[#CCFF00]"
        >
          {workout.name}
        </h2>

        <p className="mb-4 text-xs" style={{ color: "#9CA3AF" }}>
          {workout.equipment}
        </p>

        <div
          className="mb-4 h-px w-full transition-colors duration-500 group-hover:bg-[#CCFF00]/12"
          style={{ backgroundColor: "#ffffff0d" }}
        />

        <div className="flex items-center gap-5">
          {[
            { icon: <LuClock size={13} />, label: `${workout.duration} min`        },
            { icon: <LuFlame size={13} />, label: `${workout.caloriesBurned} kcal` },
            { icon: <LuStar  size={13} />, label: `${workout.rating}`              },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 transition-colors duration-300 group-hover:text-[#CCFF00]"
              style={{ color: "#9CA3AF" }}
            >
              {icon}
              <span className="text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;