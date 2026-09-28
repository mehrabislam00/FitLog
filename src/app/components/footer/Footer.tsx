import React from "react";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="border-t border-white/5"
      style={{ backgroundColor: "#0C0D10" }}
    >
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:justify-between sm:px-5 sm:text-left">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <Image
            src={Logo}
            alt="FitLog logo"
            width={24}
            height={24}
            className="h-6 w-6"
          />

          <span className="text-[15px] font-black tracking-[0.18em] text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#9CA3AF]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;