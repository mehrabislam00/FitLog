import React from "react";
import Image from "next/image";
import Logo from "@/app/assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="border-t border-white/[0.05]"
      style={{ backgroundColor: "#0C0D10" }}
    >
      <div className="container mx-auto flex  items-center justify-between px-5 py-6">

        {/* ── Logo ── */}
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

        {/* ── Copyright ── */}
        <p className="text-xs text-[#9CA3AF]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;