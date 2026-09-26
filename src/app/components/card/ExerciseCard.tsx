import React from "react";
import Image from "next/image";

type WorkoutCardProps = {
  image: string;          // image path or URL
  tags: string[];         // e.g. ["Chest", "Arms"]
  title: string;          // e.g. "Barbell Bench Press"
  equipment: string;      // e.g. "Barbell, Bench"
  duration: number;       // minutes
  calories: number;       // kcal
  rating: number;         // e.g. 4.8
};

// ── Icons ──────────────────────────────────────────────────
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FlameIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#9CA3AF">
    <path d="M12 2C10 6 7 8 7 12a5 5 0 0010 0c0-2.5-1.5-4-2-6-1 2-2 3-2 4a2 2 0 01-2-2c0-2 2-4 1-6z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── Card ───────────────────────────────────────────────────
const WorkoutCard = ({
  image,
  tags,
  title,
  equipment,
  duration,
  calories,
  rating,
}: WorkoutCardProps) => {
  return (
    <div
      className="w-full max-w-[340px] overflow-hidden rounded-[22px] transition-transform duration-300 hover:-translate-y-1"
      style={{ backgroundColor: "#111214" }}
    >
      {/* ── Image ── */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* ── Body ── */}
      <div className="px-5 pb-5 pt-4">

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3.5 py-1 text-[11px] font-black uppercase tracking-wider"
              style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="mb-1.5 text-[1.2rem] font-black uppercase leading-tight tracking-tight text-white">
          {title}
        </h2>

        {/* Equipment */}
        <p className="mb-4 text-sm" style={{ color: "#9CA3AF" }}>
          {equipment}
        </p>

        {/* Divider */}
        <div className="mb-4 h-px w-full" style={{ backgroundColor: "#ffffff0d" }} />

        {/* Stats */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <span className="text-sm" style={{ color: "#9CA3AF" }}>
              {duration} min
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <FlameIcon />
            <span className="text-sm" style={{ color: "#9CA3AF" }}>
              {calories} kcal
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <StarIcon />
            <span className="text-sm" style={{ color: "#9CA3AF" }}>
              {rating}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkoutCard;

