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
      className="px-3 py-3 sm:px-6 sm:py-5"
      style={{ backgroundColor: "#0C0D10" }}
    >
      <div
        className="relative container mx-auto overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#111214" }}
      >
        <div className="flex min-h-75 flex-col items-center gap-6 px-5 py-9 sm:flex-row sm:justify-between sm:gap-4 sm:px-8 sm:py-12 lg:min-h-85 lg:px-16">

          {/* Hero copy and workout link */}
          <div className="z-10 w-full max-w-lg flex-1">

            <p
              className="mb-5 text-[10px] font-black uppercase tracking-[0.22em]"
              style={{ color: "#CCFF00" }}
            >
              Workout Library
            </p>

            <h1 className="mb-4 text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
              Train with Intent.{" "}
              <br className="hidden sm:block" />
              Log Every Set.
            </h1>

            <p
              className="mb-8 max-w-md text-sm leading-relaxed"
              style={{ color: "#9CA3AF" }}
            >
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <button
              type="button"
              onClick={scrollToLibraries}
              className="inline-block px-6 py-3 text-[11px] font-black uppercase tracking-[0.18em] transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "#CCFF00", color: "#0C0D10" }}
            >
              Browse Workouts
            </button>
          </div>

          {/* Featured workout image */}
          <div className="relative flex w-full shrink-0 items-end justify-center sm:w-64 sm:self-end md:w-80 lg:w-105">
            <div className="relative aspect-7/6 w-full max-w-75 sm:max-w-none">
              <Image
                src={heroImage}
                alt="FitLog workout"
                fill
                sizes="(max-width: 639px) 300px, (max-width: 767px) 256px, (max-width: 1023px) 320px, 420px"
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;