"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuClock, LuFlame, LuStar, LuCheck, LuX, LuChevronDown, LuDumbbell } from "react-icons/lu";
import { WorkoutContext, type PlannedWorkout } from "@/context/workoutContext";

type Tab     = "today" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating";

const TABS: { key: Tab; label: string }[] = [
  { key: "today", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration",      label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating",        label: "Rating"   },
];

// Summary metrics for the current plan.
function StatsSection({ exercises, minutes, calories }: {
  exercises: number; minutes: number; calories: number;
}) {
  const stats = [
    { label: "Exercises", value: exercises, accent: true  },
    { label: "Minutes",   value: minutes,   accent: false },
    { label: "Calories",  value: calories,  accent: false },
  ];

  return (
    <div className="mb-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111214]">
      {stats.map(({ label, value, accent }, i) => (
        <div
          key={label}
          className={`px-8 py-6 ${i !== 0 ? "border-l border-white/[0.06]" : ""}`}
        >
          <p className="text-xs text-[#9CA3AF]">{label}</p>
          <p className={`mt-1 text-5xl font-black leading-none ${accent ? "text-[#CCFF00]" : "text-white"}`}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

// Plan tabs and workout sorting controls.
function Controls({ tab, setTab, sortBy, setSortBy }: {
  tab: Tab; setTab: (t: Tab) => void;
  sortBy: SortKey; setSortBy: (s: SortKey) => void;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="inline-flex gap-1 rounded-xl border border-white/[0.06] bg-[#111214] p-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-lg px-5 py-2 text-xs font-semibold transition-colors duration-200
              ${tab === key
                ? "bg-[#1E2028] text-white"
                : "text-[#9CA3AF] hover:text-white"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
        <span>Sort By</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortKey)}
            className="cursor-pointer appearance-none rounded-xl border border-white/10
                       bg-[#111214] py-2 pl-4 pr-8 text-xs font-medium text-white outline-none
                       transition hover:border-[#CCFF00]/30 focus:border-[#CCFF00]/50"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <LuChevronDown size={13} className=" pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        </div>
      </div>
    </div>
  );
}

// One workout entry with its available actions.
function WorkoutRow({ w, tab, onToggle, onRemove }: {
  w: PlannedWorkout; tab: Tab;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <article
      className={`group flex items-center gap-4 rounded-2xl border border-white/[0.06]
                  bg-[#111214] p-3 transition-all duration-200
                  hover:border-[#CCFF00]/20 hover:bg-[#131518]
                  ${w.done ? "opacity-50" : ""}`}
    >
      <div className="relative h-[72px] w-28 shrink-0 overflow-hidden rounded-xl">
        <Image src={w.image} alt={w.name} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className={`text-sm font-black uppercase tracking-wide text-white
                         ${w.done ? "line-through decoration-[#CCFF00]/60" : ""}`}>
          {w.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-[#9CA3AF]">{w.equipment}</p>
        <div className="mt-2 flex items-center gap-4 text-[11px] text-[#9CA3AF]">
          <Stat icon={<LuClock size={12} />}  label={`${w.duration} min`}        />
          <Stat icon={<LuFlame size={12} />}  label={`${w.caloriesBurned} kcal`} />
          <Stat icon={<LuStar  size={12} />}  label={`${w.rating}`}              />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 pr-1">
        <Link
          href={`/workout/${w.id}`}
          className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-medium
                     text-white transition-colors hover:border-[#CCFF00]/40 hover:text-[#CCFF00]"
        >
          View Details
        </Link>

        {tab === "today" && (
          <button
            onClick={() => onToggle(String(w.id))}
            style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            className="flex items-center gap-1.5 rounded-full px-4 py-2
                       text-[11px] font-black transition-all
                       hover:shadow-[0_0_20px_rgba(204,255,0,0.35)] active:scale-95"
          >
            <LuCheck size={13} strokeWidth={3} />
            {w.done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          onClick={() => onRemove(String(w.id))}
          aria-label={`Remove ${w.name}`}
          className="rounded-full p-1.5 text-[#9CA3AF] transition-colors
                     hover:bg-white/5 hover:text-white"
        >
          <LuX size={15} />
        </button>
      </div>
    </article>
  );
}

const Stat = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="flex items-center gap-1.5">
    <span className="text-[#CCFF00]">{icon}</span>
    {label}
  </span>
);

// Empty state for the selected plan tab.
function EmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl
                    border border-dashed border-white/10 bg-[#111214] py-20 text-center">
      <LuDumbbell size={32} className="text-[#CCFF00]/40" />
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CCFF00]">
          Nothing Here Yet
        </p>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          {tab === "today"
            ? "Browse the library and add a lift to get today moving."
            : "Save exercises to review them later."}
        </p>
      </div>
      {tab === "today" && (
        <Link
          href="/workout"
          style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
          className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5
                     text-xs font-black uppercase tracking-wider
                     transition-all hover:brightness-110 active:scale-95"
        >
          Go to workouts
        </Link>
      )}
    </div>
  );
}

export default function MyPlanClient() {
  const { PlanWorkout, setPlanWorkout, SaveWorkout, setSaveWorkout } =
    useContext(WorkoutContext);

  // Selected view and sort order.
  const [tab,    setTab]    = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  // Keep the selected view in sync with the URL hash.
  useEffect(() => {
    const sync = () => setTab(window.location.hash === "#saved" ? "saved" : "today");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Data for the active tab, sorted and summarized for display.
  const list = tab === "today" ? PlanWorkout : SaveWorkout;

  const sorted = useMemo(
    () => [...list].sort((a, b) =>
      sortBy === "rating" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
    ),
    [list, sortBy]
  );

  const totals = useMemo(() => ({
    exercises: PlanWorkout.length,
    minutes:   PlanWorkout.reduce((s, w) => s + w.duration,      0),
    calories:  PlanWorkout.reduce((s, w) => s + w.caloriesBurned, 0),
  }), [PlanWorkout]);

  const toggleDone = (id: string) =>
    setPlanWorkout(items => items.map(w => String(w.id) === id ? { ...w, done: !w.done } : w));

  const remove = (id: string) =>
    tab === "today"
      ? setPlanWorkout(items => items.filter(w => String(w.id) !== id))
      : setSaveWorkout(items => items.filter(w => String(w.id) !== id));

  // Main plan page body.
  return (
    <main className="min-h-screen bg-[#0C0D10] px-6 py-10 sm:px-10">
      <div className="container mx-auto ">

        {/* Page heading */}
        <header className="mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tight text-white">
            My Plan
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        {/* Plan totals */}
        <StatsSection {...totals} />

        {/* Tab and sort controls */}
        <Controls tab={tab} setTab={setTab} sortBy={sortBy} setSortBy={setSortBy} />

        {/* Active workout list */}
        <div className="mt-4 flex flex-col gap-3">
          {sorted.length === 0
            ? <EmptyState tab={tab} />
            : sorted.map(w => (
                <WorkoutRow
                  key={w.id}
                  w={w}
                  tab={tab}
                  onToggle={toggleDone}
                  onRemove={remove}
                />
              ))
          }
        </div>

      </div>
    </main>
  );
}