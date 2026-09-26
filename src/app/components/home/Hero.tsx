"use client";

import React from "react";
import Image from "next/image";
import heroImage from "@/app/assets/banner.png"; // swap with your fitness image

const Hero = () => {
  const scrollToLibraries = () => {
    const section = document.getElementById("libraries");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="px-4 py-4 sm:px-6 sm:py-5"
      style={{ backgroundColor: "#0C0D10" }}
    >
      {/* Card wrapper */}
      <div
        className="relative container mx-auto  overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#111214" }}
      >
        <div className="flex min-h-[300px] flex-col items-center gap-8 px-10 py-14 sm:flex-row sm:justify-between sm:gap-0 lg:min-h-[340px] lg:px-16">

          {/* ── Left Content ── */}
          <div className="z-10 w-full max-w-lg flex-1">

            {/* Label */}
            <p
              className="mb-5 text-[10px] font-black uppercase tracking-[0.22em]"
              style={{ color: "#CCFF00" }}
            >
              Workout Library
            </p>

            {/* Heading */}
            <h1 className="mb-4 text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              Train with Intent.{" "}
              <br className="hidden sm:block" />
              Log Every Set.
            </h1>

            {/* Description */}
            <p
              className="mb-8 max-w-md text-sm leading-relaxed"
              style={{ color: "#9CA3AF" }}
            >
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today's plan, and watch the week's work add up.
            </p>

            {/* CTA Button — smooth scroll to library */}
            <button
              type="button"
              onClick={scrollToLibraries}
              className="inline-block px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            >
              Browse Workouts
            </button>
          </div>

          {/* ── Right Image ── */}
          <div className="relative flex w-full flex-shrink-0 items-end justify-center sm:w-auto sm:self-end">
            <Image
              src={heroImage}
              alt="FitLog workout"
              width={420}
              height={360}
              priority
              className="h-auto w-[300px] object-contain  drop-shadow-2xl sm:w-[340px] lg:w-[420px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;