"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".journey-card");
    cards.forEach((card, i) => {
      const isRight = i % 2 !== 0;
      gsap.fromTo(
        card,
        { opacity: 0, x: isRight ? 50 : -50, y: 10 },
        {
          opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        }
      );
    });

    const line = sectionRef.current.querySelector(".timeline-line");
    if (line) {
      gsap.fromTo(line, { scaleY: 0, transformOrigin: "top" }, {
        scaleY: 1, duration: 1.6, ease: "power2.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#04050a] py-24 md:py-36 px-4 overflow-hidden">
      {/* Mesh glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#d4af6a]/05 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#3da9fc]/04 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header glass chip */}
        <div className="text-center mb-20">
          <div
            className="inline-block px-5 py-2 rounded-full mb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af6a]"
            style={{ background: "rgba(212,175,106,0.08)", border: "1px solid rgba(212,175,106,0.2)" }}
          >
            Chapter 01
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-display text-white leading-none">
            The Origin Story
          </h2>
          <div className="mt-5 h-px w-28 bg-gradient-to-r from-transparent via-[#d4af6a]/60 to-transparent mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop vertical line */}
          <div className="timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,106,0.5) 20%, rgba(212,175,106,0.5) 80%, transparent)" }} />
          {/* Mobile vertical line */}
          <div className="timeline-line md:hidden absolute left-5 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,106,0.4) 20%, rgba(212,175,106,0.4) 80%, transparent)" }} />

          <div className="flex flex-col gap-10 md:gap-14">
            {journey.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-start md:items-center">
                  {/* ── Mobile ── */}
                  <div className="md:hidden flex gap-5 pl-12 w-full">
                    {/* Dot */}
                    <div
                      className="absolute left-[13px] top-4 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(212,175,106,0.15)",
                        border: "2px solid rgba(212,175,106,0.6)",
                        boxShadow: "0 0 16px rgba(212,175,106,0.3)",
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#d4af6a]" />
                    </div>

                    {/* Card */}
                    <div
                      className="journey-card w-full rounded-2xl p-5 relative overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-display text-xl font-bold text-[#d4af6a]">{item.year}</span>
                        {item.age && (
                          <span
                            className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full text-[#8a8a9f]"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                          >
                            Age {item.age}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-display text-white mb-1">{item.label}</h3>
                      <p className="text-[#8a8a9f] text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* ── Desktop alternating ── */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 w-full">
                    {isLeft ? (
                      <div
                        className="journey-card relative rounded-2xl p-7 text-right overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(24px)",
                          WebkitBackdropFilter: "blur(24px)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="flex items-center justify-end gap-3 mb-3">
                          {item.age && (
                            <span
                              className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full text-[#8a8a9f]"
                              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                              Age {item.age}
                            </span>
                          )}
                          <span className="font-display text-2xl font-bold text-[#d4af6a]">{item.year}</span>
                        </div>
                        <h3 className="text-xl font-display text-white mb-2">{item.label}</h3>
                        <p className="text-[#8a8a9f] text-sm leading-relaxed ml-auto max-w-xs">{item.description}</p>
                      </div>
                    ) : (
                      <div />
                    )}

                    {/* Center dot */}
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center z-10"
                      style={{
                        background: "rgba(212,175,106,0.12)",
                        border: "2px solid rgba(212,175,106,0.7)",
                        boxShadow: "0 0 20px rgba(212,175,106,0.4)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#d4af6a]" />
                    </div>

                    {!isLeft ? (
                      <div
                        className="journey-card relative rounded-2xl p-7 overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(24px)",
                          WebkitBackdropFilter: "blur(24px)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-display text-2xl font-bold text-[#d4af6a]">{item.year}</span>
                          {item.age && (
                            <span
                              className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full text-[#8a8a9f]"
                              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                            >
                              Age {item.age}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-display text-white mb-2">{item.label}</h3>
                        <p className="text-[#8a8a9f] text-sm leading-relaxed max-w-xs">{item.description}</p>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quote */}
        <div
          className="mt-24 relative rounded-3xl p-8 md:p-12 text-center overflow-hidden"
          style={{
            background: "rgba(212,175,106,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(212,175,106,0.15)",
          }}
        >
          <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#d4af6a]/40 to-transparent" />
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[#d4af6a]/15 text-8xl font-serif leading-none select-none">&ldquo;</div>
          <p className="relative text-lg md:text-xl text-[#8a8a9f] leading-relaxed italic max-w-2xl mx-auto">
            From stepping onto film sets at sixteen to leading productions and acting on screen, every project became a chapter in an evolving cinematic journey.
          </p>
          <div className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-[#d4af6a]/40 to-transparent mx-auto" />
          <p className="mt-4 text-[#d4af6a] font-display text-sm tracking-widest uppercase">Hari Meghansh Chadalavada</p>
        </div>
      </div>
    </section>
  );
};
