"use client";

import React from "react";
import Image from "next/image";
import { LuClock, LuFlame, LuStar, LuArrowRight } from "react-icons/lu";

type WorkoutCardProps = {
  image: string;
  tags: string[];
  title: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
};

const WorkoutCard = ({ image, tags, title, equipment, duration, calories, rating }: WorkoutCardProps) => {
  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-[22px]
                 border border-white/[0.06]
                 transition-all duration-500 ease-out
                 hover:-translate-y-[6px]
                 hover:border-[#CCFF00]/20
                 hover:shadow-[0_24px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(204,255,0,0.07)]"
      style={{ backgroundColor: "#111214" }}
    >
      {/* ── Image ── */}
      <div className="relative h-[210px] w-full overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover transition-all duration-600 ease-out
                     group-hover:scale-[1.06] group-hover:brightness-[0.72]"
        />

        {/* Light tint overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{ background: "rgba(0,0,0,0.28)" }}
        />

        {/* Hover content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3
                     opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100"
        >
          {/* CTA button */}
          <div className="translate-y-4 transition-transform duration-350 ease-out group-hover:translate-y-0">
            <button
              className="flex items-center gap-2 rounded-full px-5 py-2.5
                         text-[11px] font-black uppercase tracking-widest
                         shadow-[0_0_28px_rgba(204,255,0,0.45)]
                         active:scale-95 transition-transform duration-150"
              style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            >
              View Workout <LuArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Stats chip */}
          <div
            className="translate-y-4 transition-transform duration-350 ease-out delay-75
                       group-hover:translate-y-0
                       flex items-center gap-2 rounded-full px-4 py-[7px]
                       text-[10px] font-semibold border"
            style={{
              backgroundColor: "rgba(0,0,0,0.45)",
              borderColor: "rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <span className="flex items-center gap-1 opacity-80">
              <LuClock size={12} /> {duration} min
            </span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1 opacity-80">
              <LuFlame size={12} /> {calories} kcal
            </span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1 font-bold" style={{ color: "#CCFF00" }}>
              <LuStar size={12} /> {rating}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-5 pb-5 pt-4">

        {/* Tags */}
        <div className="mb-3.5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-[3px] text-[10px] font-black uppercase tracking-wider
                         transition-shadow duration-300
                         group-hover:shadow-[0_0_12px_rgba(204,255,0,0.3)]"
              style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2
          className="mb-1 text-[1.05rem] font-black uppercase leading-tight tracking-tight text-white
                     transition-colors duration-300 group-hover:text-[#CCFF00]"
        >
          {title}
        </h2>

        {/* Equipment */}
        <p className="mb-4 text-xs" style={{ color: "#9CA3AF" }}>
          {equipment}
        </p>

        {/* Divider */}
        <div
          className="mb-4 h-px w-full transition-colors duration-500 group-hover:bg-[#CCFF00]/12"
          style={{ backgroundColor: "#ffffff0d" }}
        />

        {/* Stats */}
        <div className="flex items-center gap-5">
          {[
            { icon: <LuClock size={13} />,  label: `${duration} min`  },
            { icon: <LuFlame size={13} />,  label: `${calories} kcal` },
            { icon: <LuStar  size={13} />,  label: `${rating}`        },
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