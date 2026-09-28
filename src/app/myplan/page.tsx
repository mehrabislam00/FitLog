

"use client";

import { useContext, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuClock, LuFlame, LuStar, LuCheck, LuX, LuChevronDown } from "react-icons/lu";
import { WorkoutContext, type PlannedWorkout } from "@/context/workoutContext";

type Tab = "today" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

/* ───────────── Page ───────────── */
const MyPlan = () => {
  const { PlanWorkout, setPlanWorkout, SaveWorkout, setSaveWorkout } =
    useContext(WorkoutContext);
  const [tab, setTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const list: PlannedWorkout[] = tab === "today" ? PlanWorkout : SaveWorkout;

  const sorted = useMemo(() => {
    return [...list].sort((a, b) =>
      sortBy === "rating" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
    );
  }, [list, sortBy]);

  const totals = useMemo(
    () => ({
      exercises: PlanWorkout.length,
      minutes: PlanWorkout.reduce((s, w) => s + w.duration, 0),
      calories: PlanWorkout.reduce((s, w) => s + w.caloriesBurned, 0),
    }),
    [PlanWorkout]
  );

  const toggleDone = (id: string) =>
    setPlanWorkout((items) =>
      items.map((workout) =>
        String(workout.id) === id ? { ...workout, done: !workout.done } : workout
      )
    );

  const remove = (id: string) => {
    if (tab === "today") {
      setPlanWorkout((items) => items.filter((workout) => String(workout.id) !== id));
    } else {
      setSaveWorkout((items) => items.filter((workout) => String(workout.id) !== id));
    }
  };

  return (
    <main className="min-h-screen px-6 py-8 sm:px-8" style={{ backgroundColor: "#0C0D10" }}>
      <div className="mx-auto max-w-5xl">
        {/* ── Header ── */}
        <header className="mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">My Plan</h1>
          <p className="mt-1 text-sm" style={{ color: "#9CA3AF" }}>
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        {/* ── Stats summary ── */}
        <section
          className="mb-8 grid grid-cols-1 rounded-[22px] border border-white/6 sm:grid-cols-3"
          style={{ backgroundColor: "#111214" }}
        >
          {[
            { label: "Exercises", value: totals.exercises },
            { label: "Minutes", value: totals.minutes },
            { label: "Calories", value: totals.calories },
          ].map(({ label, value }, i) => (
            <div
              key={label}
              className={`px-6 py-6 ${i !== 0 ? "border-t border-white/6 sm:border-l sm:border-t-0" : ""}`}
            >
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                {label}
              </p>
              <p
                className="mt-1 text-4xl font-black leading-none"
                style={{ color: label === "Exercises" ? "#CCFF00" : "#fff" }}
              >
                {value}
              </p>
            </div>
          ))}
        </section>

        {/* ── Tabs + Sort ── */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div
            className="inline-flex rounded-xl border border-white/6 p-1"
            style={{ backgroundColor: "#111214" }}
          >
            {(
              [
                { key: "today", label: "Today's Plan" },
                { key: "saved", label: "Saved" },
              ] as { key: Tab; label: string }[]
            ).map(({ key, label }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                    active ? "text-white" : "hover:text-white"
                  }`}
                  style={{
                    backgroundColor: active ? "#1E2028" : "transparent",
                    color: active ? "#fff" : "#9CA3AF",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-2 text-xs" style={{ color: "#9CA3AF" }}>
            Sort By
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="cursor-pointer appearance-none rounded-lg border border-white/10 py-2 pl-3 pr-8
                           text-xs font-medium text-white outline-none transition-colors
                           hover:border-[#CCFF00]/30 focus:border-[#CCFF00]/50"
                style={{ backgroundColor: "#111214" }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <LuChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
              />
            </div>
          </label>
        </div>

        {/* ── List ── */}
        <div className="flex flex-col gap-3">
          {sorted.length === 0 && (
            <div
              className="rounded-[18px] border border-dashed border-white/10 py-14 text-center text-sm"
              style={{ color: "#9CA3AF", backgroundColor: "#111214" }}
            >
              {tab === "today" ? "No exercises in today's plan yet." : "Nothing saved yet."}
            </div>
          )}

          {sorted.map((w) => (
            <article
              key={w.id}
              className={`group flex flex-col gap-4 rounded-[18px] border border-white/6 p-3
                          transition-all duration-300 hover:border-[#CCFF00]/20
                          sm:flex-row sm:items-center ${w.done ? "opacity-60" : ""}`}
              style={{ backgroundColor: "#111214" }}
            >
              {/* Thumbnail */}
              <div className="relative h-15 w-27.5 shrink-0 overflow-hidden rounded-lg">
                <Image src={w.image} alt={w.name} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <h3
                  className={`text-sm font-black uppercase tracking-wide text-white ${
                    w.done ? "line-through" : ""
                  }`}
                >
                  {w.name}
                </h3>
                <p className="mt-0.5 text-[11px]" style={{ color: "#9CA3AF" }}>
                  {w.equipment}
                </p>
                <div className="mt-2 flex items-center gap-4 text-[11px] text-white/80">
                  <span className="flex items-center gap-1.5">
                    <LuClock size={12} style={{ color: "#CCFF00" }} /> {w.duration} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <LuFlame size={12} style={{ color: "#CCFF00" }} /> {w.caloriesBurned} kcal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <LuStar size={12} style={{ color: "#CCFF00" }} /> {w.rating}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 sm:pr-2">
                <Link
                  href={`/workout/${w.id}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-medium text-white
                             transition-colors duration-200 hover:border-[#CCFF00]/40 hover:text-[#CCFF00]"
                >
                  View Details
                </Link>

                {tab === "today" && (
                  <button
                    onClick={() => toggleDone(String(w.id))}
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold
                               transition-all duration-150 hover:shadow-[0_0_20px_rgba(204,255,0,0.35)]
                               active:scale-95"
                    style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
                  >
                    <LuCheck size={13} strokeWidth={3} />
                    {w.done ? "Done" : "Mark as Done"}
                  </button>
                )}

                <button
                  onClick={() => remove(String(w.id))}
                  aria-label={`Remove ${w.name}`}
                  className="p-1.5 transition-colors duration-200 hover:text-white"
                  style={{ color: "#9CA3AF" }}
                >
                  <LuX size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyPlan;