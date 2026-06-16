"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({
  project,
  index,
}: {
  project: { title: string; roles: string[]; note?: string; slug: string; image: string };
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    gsap.to(cardRef.current, {
      rotateY: ((x - cx) / cx) * 6,
      rotateX: (-(y - cy) / cy) * 4,
      duration: 0.4,
      ease: "power2.out",
    });
    // Move spotlight
    cardRef.current.style.setProperty("--mx", `${x}px`);
    cardRef.current.style.setProperty("--my", `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex-shrink-0 w-[82vw] md:w-[520px] h-[64vh] md:h-[72vh] rounded-3xl overflow-hidden cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Spotlight radial highlight on hover */}
      <div
        className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle 300px at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.06), transparent)",
        }}
      />

      {/* Image */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
        <Image
          src={project.image || "/posters/placeholder.png"}
          alt={project.title}
          fill
          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
          priority={index < 2}
        />
      </div>

      {/* Glass gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(4,5,10,0.95) 0%, rgba(4,5,10,0.5) 50%, rgba(4,5,10,0.1) 100%)",
        }}
      />

      {/* Glass info panel at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 p-6 md:p-8"
        style={{ transform: "translateZ(20px)" }}
      >
        <div
          className="rounded-2xl p-5 md:p-6 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="flex flex-wrap gap-2 mb-3">
            {project.roles.map((role, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest rounded-full font-mono"
                style={{
                  background: "rgba(212,175,106,0.12)",
                  border: "1px solid rgba(212,175,106,0.3)",
                  color: "#d4af6a",
                }}
              >
                {role}
              </span>
            ))}
          </div>

          <h3 className="text-xl md:text-3xl font-display text-white leading-tight mb-1 group-hover:text-[#d4af6a] transition-colors duration-300">
            {project.title}
          </h3>

          {project.note && (
            <p className="text-[11px] text-[#8a8a9f] uppercase tracking-widest mt-1">{project.note}</p>
          )}
        </div>
      </div>

      {/* Corner index */}
      <div
        className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs text-white/50"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
};

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      containerRef.current.classList.remove("flex", "items-center", "h-full", "pt-16");
      containerRef.current.classList.add("flex-col", "items-center", "pt-32", "pb-16");
      return;
    }

    const getScrollAmount = () => -(containerRef.current!.scrollWidth - window.innerWidth);

    const tween = gsap.to(containerRef.current, { x: getScrollAmount, ease: "none" });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center mesh-bg"
      style={{ perspective: "1200px" }}
    >
      {/* Section header glass chip */}
      <div
        className="absolute top-10 md:top-16 left-4 md:left-16 z-10 px-5 py-3 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p className="text-[10px] text-[#d4af6a] font-mono uppercase tracking-[0.3em] mb-0.5">Chapter 02</p>
        <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-display text-white leading-none">The Showreel</h2>
      </div>

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] rounded-full bg-[#3da9fc]/05 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#d4af6a]/05 blur-[100px]" />
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 md:gap-10 px-4 md:px-20 items-center h-full pt-16 md:pt-0"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};
