import React from "react";
import WorkoutCard from "../components/card/WorkoutCard";


// ── Real Unsplash images (gym / exercise focused) ──────────
const workouts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&w=600&q=80",
    tags: ["Chest", "Arms"],
    title: "Barbell Bench Press",
    equipment: "Barbell, Bench",
    duration: 25,
    calories: 180,
    rating: 4.8,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&w=600&q=80",
    tags: ["Back", "Arms"],
    title: "Pull-Up",
    equipment: "Pull-up Bar",
    duration: 15,
    calories: 120,
    rating: 4.7,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&w=600&q=80",
    tags: ["Legs", "Core"],
    title: "Back Squat",
    equipment: "Barbell, Rack",
    duration: 30,
    calories: 240,
    rating: 4.9,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&w=600&q=80",
    tags: ["Shoulders", "Arms"],
    title: "Overhead Press",
    equipment: "Barbell",
    duration: 20,
    calories: 150,
    rating: 4.6,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&w=600&q=80",
    tags: ["Arms"],
    title: "Dumbbell Bicep Curl",
    equipment: "Dumbbells",
    duration: 12,
    calories: 80,
    rating: 4.3,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&w=600&q=80",
    tags: ["Back", "Legs"],
    title: "Conventional Deadlift",
    equipment: "Barbell",
    duration: 25,
    calories: 260,
    rating: 4.9,
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&w=600&q=80",
    tags: ["Core"],
    title: "Hollow-Body Plank",
    equipment: "Bodyweight",
    duration: 10,
    calories: 60,
    rating: 4.4,
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&w=600&q=80",
    tags: ["Arms"],
    title: "Dumbbell Bicep Curl",
    equipment: "Dumbbells",
    duration: 12,
    calories: 80,
    rating: 4.3,
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&w=600&q=80",
    tags: ["Chest", "Arms", "Core"],
    title: "Push-Up",
    equipment: "Bodyweight",
    duration: 10,
    calories: 90,
    rating: 4.5,
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&w=600&q=80",
    tags: ["Legs"],
    title: "Walking Lunge",
    equipment: "Dumbbells (optional)",
    duration: 18,
    calories: 170,
    rating: 4.4,
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&w=600&q=80",
    tags: ["Core"],
    title: "Russian Twist",
    equipment: "Medicine Ball",
    duration: 8,
    calories: 76,
    rating: 4.1,
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&w=600&q=80",
    tags: ["Arms"],
    title: "Dumbbell Bicep Curl",
    equipment: "Dumbbells",
    duration: 12,
    calories: 80,
    rating: 4.3,
  },
];

// ── Page ───────────────────────────────────────────────────
const WorkOut = () => {
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
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} {...workout} />
          ))}
        </div>

      </div>
    </main>
  );
};

export default WorkOut;