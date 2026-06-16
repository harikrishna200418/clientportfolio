"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

export const Preloader = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("hmc_preloader_complete")) {
      setTimeout(() => setShouldRender(false), 0);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        sessionStorage.setItem("hmc_preloader_complete", "true");
        setTimeout(() => setShouldRender(false), 1000);
      },
    });

    tl.fromTo(
      ".preloader-letter",
      { opacity: 0, y: 30, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.18, duration: 0.9, ease: "power3.out" }
    )
      .fromTo(
        ".preloader-sub",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      )
      .to(".preloader-text", { opacity: 0, filter: "blur(8px)", duration: 0.5, delay: 0.6 })
      .to(".preloader-iris-top", { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "iris")
      .to(".preloader-iris-bottom", { yPercent: 100, duration: 0.85, ease: "power4.inOut" }, "iris");
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${isComplete ? "opacity-0" : "opacity-100"}`}
    >
      {/* Iris panels */}
      <div className="absolute inset-0 flex flex-col">
        <div className="preloader-iris-top w-full h-1/2 bg-[#04050a]" />
        <div className="preloader-iris-bottom w-full h-1/2 bg-[#04050a]" />
      </div>

      {/* Glass card center */}
      <div className="preloader-text relative z-10 flex flex-col items-center gap-6">
        {/* Glass panel */}
        <div
          className="relative px-14 py-10 rounded-3xl flex flex-col items-center gap-4 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 80px rgba(212,175,106,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#d4af6a]/60 to-transparent" />

          {/* Monogram */}
          <div className="preloader-letter-group flex gap-3 font-display text-5xl md:text-7xl tracking-[0.15em]">
            {["H", "M", "C"].map((l, i) => (
              <span
                key={i}
                className="preloader-letter inline-block bg-gradient-to-b from-[#f0f0f4] to-[#d4af6a] bg-clip-text text-transparent font-bold"
              >
                {l}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af6a]/50 to-transparent" />

          {/* Subtitle */}
          <p className="preloader-sub text-[10px] uppercase tracking-[0.4em] text-[#8a8a9f] font-mono">
            Hari Meghansh Chadalavada
          </p>
        </div>

        {/* Loading dots */}
        <div className="preloader-sub flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-[#d4af6a]/40 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
