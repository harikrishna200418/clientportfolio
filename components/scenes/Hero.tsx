"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Ken Burns zoom on BG
    gsap.fromTo(bgRef.current, { scale: 1.1 }, { scale: 1, duration: 2.8, ease: "power2.out" });

    // Stagger in content elements
    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll(".hero-anim");
      gsap.fromTo(
        els,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.15, duration: 1.1, ease: "power3.out", delay: 0.5 }
      );
    }

    // Animate headline letters
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current.querySelectorAll("span"),
        { opacity: 0, y: 25, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.025, duration: 1.0, ease: "power3.out", delay: 0.7 }
      );
    }

    // Subtle mouse parallax on BG image
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      gsap.to(bgRef.current, { x: dx * -18, y: dy * -10, duration: 1.4, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMouseMove);

    // Scroll parallax — image drifts at 60% of scroll speed
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(bgRef.current, { y: self.progress * 100, ease: "none", overwrite: "auto" });
      },
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end items-start"
    >
      {/* ── Background Image (full bleed, no card) ── */}
      <div
        ref={bgRef}
        className="absolute inset-[-6%] z-0"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/images/BTS_Film_Set_Photo.jpeg"
          alt="Hari Meghansh on set"
          fill
          className="object-cover object-center"
          priority
          quality={95}
        />
      </div>

      {/* ── Cinematic gradient: only bottom-heavy dark, rest stays transparent ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(4,5,10,0.98) 0%, rgba(4,5,10,0.75) 28%, rgba(4,5,10,0.25) 55%, transparent 100%)",
        }}
      />
      {/* Subtle left vignette so text reads well */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(4,5,10,0.6) 0%, rgba(4,5,10,0.1) 50%, transparent 100%)",
        }}
      />

      {/* ── Content: floats directly on the image ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 md:px-16 lg:px-24 pb-16 md:pb-20 pt-40 md:pt-0"
      >
        {/* Roles badge */}
        <div className="hero-anim inline-flex items-center gap-2 mb-5 md:mb-7">
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4af6a] animate-pulse flex-shrink-0" />
          <span
            className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-[#d4af6a] font-mono"
          >
            {profile.roles.join(" · ")}
          </span>
        </div>

        {/* Name — large, left-aligned, no card */}
        <h1
          ref={headlineRef}
          className="font-display font-bold leading-[0.88] tracking-tight text-[clamp(3.2rem,10vw,9rem)] mb-8 md:mb-10"
        >
          {profile.name.split(" ").map((word, wi) => (
            <span key={wi} className="block">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="inline-block text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Stats — minimal, no box background, just thin separator lines */}
        <div className="hero-anim flex flex-wrap items-center gap-6 md:gap-10 mb-8 md:mb-10">
          {[
            { val: profile.stats.years, label: "Experience" },
            { val: profile.stats.productions, label: "Productions" },
            { val: "4+", label: "Formats" },
          ].map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="w-px h-8 bg-white/20 hidden sm:block" />}
              <div className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl text-[#d4af6a] font-bold leading-none">
                  {s.val}
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/50 font-mono mt-1">
                  {s.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Divider line */}
        <div className="hero-anim w-16 h-px bg-gradient-to-r from-[#d4af6a]/80 to-transparent mb-8" />

        {/* CTA Buttons — floating, no surrounding card */}
        <div className="hero-anim flex flex-wrap gap-3">
          <button
            className="px-7 py-3.5 rounded-full font-display text-sm uppercase tracking-widest text-[#04050a] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,106,0.5)]"
            style={{ background: "linear-gradient(135deg, #d4af6a, #c8a050)" }}
          >
            View Filmography
          </button>
          <button
            className="px-7 py-3.5 rounded-full font-display text-sm uppercase tracking-widest text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Explore Journey
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white font-mono rotate-90 mb-4 origin-center">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};
