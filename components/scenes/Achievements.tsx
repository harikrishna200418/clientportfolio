"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "5+", label: "Years of Experience", sub: "Telugu film industry", color: "#d4af6a" },
  { value: "10+", label: "Productions", sub: "Across all formats", color: "#3da9fc" },
  { value: "4", label: "Formats Mastered", sub: "Web · Short · Feature · Ad", color: "#a78bfa" },
];

export const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".stat-card"),
      { opacity: 0, y: 50, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".badge-item"),
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.5)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
      }
    );
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-36 px-4 overflow-hidden" style={{ background: "#04050a" }}>
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#3da9fc]/06 blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-5 py-2 rounded-full mb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af6a]"
            style={{ background: "rgba(212,175,106,0.08)", border: "1px solid rgba(212,175,106,0.2)" }}
          >
            Chapter 03
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display text-white leading-none">By the Numbers</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af6a]/50 to-transparent mx-auto" />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card group relative rounded-2xl p-8 text-center overflow-hidden cursor-default transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${stat.color}10 0%, transparent 70%)` }}
              />
              {/* Corner border accent on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)` }}
              />

              <div className="relative z-10">
                <div
                  className="text-[clamp(3.5rem,8vw,5.5rem)] font-display font-bold leading-none mb-3"
                  style={{ color: stat.color, textShadow: `0 0 40px ${stat.color}40` }}
                >
                  {stat.value}
                </div>
                <p className="text-white font-display text-lg mb-1">{stat.label}</p>
                <p className="text-[#8a8a9f] text-xs">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Formats */}
        <div
          className="rounded-2xl p-6 md:p-8 text-center mb-8 overflow-hidden relative"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-[#8a8a9f] text-xs uppercase tracking-[0.25em] mb-5 font-mono">Formats Worked Across</p>
          <div className="flex flex-wrap justify-center gap-3">
            {achievements.formats.map((format, i) => (
              <span
                key={i}
                className="badge-item px-5 py-2.5 rounded-full font-display text-sm text-white transition-all duration-300 hover:text-[#d4af6a]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-col sm:flex-row gap-4">
          {achievements.highlights.map((h, i) => (
            <div
              key={i}
              className="badge-item flex-1 flex items-center gap-4 rounded-2xl p-5 overflow-hidden relative"
              style={{
                background: "rgba(61,169,252,0.05)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(61,169,252,0.2)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3da9fc]/30 to-transparent" />
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#3da9fc]" style={{ boxShadow: "0 0 10px #3da9fc" }} />
              <p className="text-[#3da9fc] font-display text-sm">{h}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
