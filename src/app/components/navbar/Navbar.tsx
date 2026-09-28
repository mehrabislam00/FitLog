"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/app/assets/logo.png";
import { WorkoutContext } from "@/context/workoutContext";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { PlanWorkout, SaveWorkout } = useContext(WorkoutContext);
  const planCount = PlanWorkout.length;
  const savedCount = SaveWorkout.length;

  const navLinks = [
    { href: "/", label: "Workouts" },
    { href: "/myplan", label: "My Plan" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/5"
      style={{ backgroundColor: "#0C0D10" }}
    >
      <div className="  flex h-15  items-center justify-between px-5 container mx-auto">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)} scroll={false}>
          <Image
            src={Logo}
            alt="FitLog logo"
            width={24}
            height={24}
            className="h-6 w-6"
          />

          <span
            className="text-[17px] font-black tracking-[0.18em] text-white"
          >
            FITLOG
          </span>
        </Link>

        {/* ── Center Nav (desktop) ── */}
        <div
          className="hidden items-center gap-0.5 rounded-full p-1 sm:flex"
          style={{ backgroundColor: "#14161a" }}
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                scroll={false}
                className={`rounded-full px-5 py-1.75 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-[#CCFF00]"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
                style={isActive ? { backgroundColor: "#1c2c08" } : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-5">
          {/* Plan badge */}
          <Link
            href="/myplan#today"
            onClick={() => setMenuOpen(false)}
            aria-label={`Today's plan, ${planCount} workouts`}
            className="flex items-center gap-2 text-white transition-colors hover:text-[#CCFF00]"
          >
            <span className="text-sm font-semibold text-white">Plan</span>
            <span
              className="flex h-5.5 w-5.5 items-center justify-center rounded-full text-[11px] font-black"
              style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            >
              {planCount}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/myplan#saved"
            onClick={() => setMenuOpen(false)}
            aria-label={`Saved workouts, ${savedCount} workouts`}
            className="flex items-center gap-1.5 text-white transition-colors hover:text-[#CCFF00]"
          >
            <span className="text-sm font-semibold text-white">Saved</span>
            <span className="text-sm text-[#9CA3AF]">{savedCount}</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center sm:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-5 w-5 text-[#9CA3AF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Dropdown ── */}
      {menuOpen && (
        <div
          className="border-t border-white/5 px-5 py-3 sm:hidden"
          style={{ backgroundColor: "#0C0D10" }}
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                scroll={false}
                className={`block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? "text-[#CCFF00]" : "text-[#9CA3AF] hover:text-white"
                }`}
                style={isActive ? { backgroundColor: "#1c2c08" } : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;