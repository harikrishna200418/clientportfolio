"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const COLORS = ["#3da9fc","#d4af6a","#ff5e3a","#a78bfa","#34d399","#fb923c","#f472b6","#60a5fa"];

const DESCRIPTIONS: Record<string, string> = {
  "Production Planning": "Logistics, scheduling & pre-production",
  "Visual Storytelling": "Crafting narrative through the lens",
  "Editing":             "Rhythm, pacing & post-production",
  "Direction":           "Blocking, performance & vision",
  "Leadership":          "Managing crew & collaborators",
  "Budget Management":   "Producing within constraints",
  "Content Development": "Ideation, writing & development",
};

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".skill-card"),
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
        stagger: { amount: 0.6, from: "start" },
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      }
    );
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 px-4 overflow-hidden" style={{ background: "#04050a" }}>
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#3da9fc]/06 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-block px-5 py-2 rounded-full mb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af6a]"
            style={{ background: "rgba(212,175,106,0.08)", border: "1px solid rgba(212,175,106,0.2)" }}
          >
            Chapter 04
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display text-white leading-none">The Toolkit</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af6a]/50 to-transparent mx-auto" />
          <p className="mt-5 text-[#8a8a9f] text-sm md:text-base max-w-md mx-auto">
            Every skill forged through real productions — from scripts to screens.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="skill-card group relative rounded-2xl p-6 md:p-7 overflow-hidden cursor-default transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Shimmer top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {/* Hover glow bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 30% 40%, ${COLORS[i % COLORS.length]}15 0%, transparent 70%)` }}
              />
              {/* Hover top border */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${COLORS[i % COLORS.length]}90, transparent)` }}
              />

              <div className="relative z-10">
                {/* Icon row */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${COLORS[i % COLORS.length]}15`,
                      border: `1px solid ${COLORS[i % COLORS.length]}35`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ background: COLORS[i % COLORS.length], boxShadow: `0 0 14px ${COLORS[i % COLORS.length]}80` }}
                    />
                  </div>
                  <span className="text-[#2a2a3a] font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <h3 className="font-display text-lg md:text-xl text-white mb-1.5">{skill}</h3>
                <p className="text-[#8a8a9f] text-xs md:text-sm leading-relaxed">{DESCRIPTIONS[skill] || "Core production expertise"}</p>

                {/* Footer */}
                <div
                  className="mt-5 pt-4 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: COLORS[i % COLORS.length] }}>
                    Skill {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-4 h-px" style={{ background: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div
          className="mt-12 rounded-2xl p-5 text-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p className="text-[#8a8a9f] text-sm">
            <span className="text-white font-display">{skills.length} disciplines</span> across{" "}
            <span className="text-[#d4af6a]">5+ years</span> of Telugu film industry experience.
          </p>
        </div>
      </div>
    </section>
  );
};
