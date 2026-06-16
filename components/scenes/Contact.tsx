"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contact } from "@/lib/content";
import { Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const contactItems = [
  { icon: Mail, label: "Email", value: "chmeghansh@gmail.com", href: `mailto:${contact.email}`, color: "#3da9fc", desc: "Drop a message anytime" },
  { icon: Phone, label: "Phone", value: "+91 82979 20092", href: `tel:${contact.phone}`, color: "#34d399", desc: "Let's talk directly" },
  { icon: InstagramIcon, label: "Instagram", value: "@harimeghansh", href: contact.instagram, color: "#f472b6", desc: "Behind-the-scenes & reels" },
  { icon: WhatsAppIcon, label: "WhatsApp", value: "Chat directly", href: `https://wa.me/918297920092`, color: "#34d399", desc: "Quick collaborations" },
];

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".contact-card"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 px-4 overflow-hidden"
      style={{ background: "#04050a", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#3da9fc]/07 blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#d4af6a]/05 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-block px-5 py-2 rounded-full mb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af6a]"
            style={{ background: "rgba(212,175,106,0.08)", border: "1px solid rgba(212,175,106,0.2)" }}
          >
            Chapter 06 — Contact
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-display text-white leading-none">Let&apos;s Create</h2>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-display text-[#d4af6a] leading-none italic">Cinema Together</h2>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af6a]/50 to-transparent mx-auto" />
          <p className="mt-6 text-[#8a8a9f] text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Whether it&apos;s a feature, a short film, or a commercial — reach out and let&apos;s build something extraordinary.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card group relative overflow-hidden rounded-2xl p-5 md:p-6 flex items-center gap-5 transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* Shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 20% 50%, ${item.color}12 0%, transparent 70%)` }}
                />
                {/* Hover top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}80, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}35`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: item.color }} />
                </div>

                {/* Text */}
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="text-[#8a8a9f] text-[10px] uppercase tracking-widest mb-0.5 font-mono">{item.label}</p>
                  <p className="text-white font-display text-base md:text-lg truncate">{item.value}</p>
                  <p
                    className="text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: item.color }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Arrow */}
                <svg className="relative z-10 flex-shrink-0 w-5 h-5 text-[#2a2a3a] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            );
          })}
        </div>

        {/* CTA Glass Panel */}
        <div
          className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden"
          style={{
            background: "rgba(212,175,106,0.04)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(212,175,106,0.18)",
            boxShadow: "inset 0 1px 0 rgba(212,175,106,0.12)",
          }}
        >
          <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-[#d4af6a]/50 to-transparent" />
          <p className="text-[#8a8a9f] text-xs uppercase tracking-widest mb-3 font-mono">Open for Collaborations</p>
          <h3 className="text-2xl md:text-4xl font-display text-white mb-7">Scripts. Sets. Stories.</h3>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display text-sm uppercase tracking-widest text-[#04050a] font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,106,0.4)]"
            style={{ background: "linear-gradient(135deg, #d4af6a, #c8a050)" }}
          >
            <Mail className="w-4 h-4" />
            Start a Conversation
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-14 text-center text-[#8a8a9f]">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/8" />
            <span className="font-display text-2xl tracking-[0.35em] text-white/20">HMC</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/8" />
          </div>
          <p className="text-xs uppercase tracking-widest opacity-30 mb-1">Built as a cinematic experience</p>
          <p className="text-xs opacity-20">&copy; {new Date().getFullYear()} Hari Meghansh Chadalavada. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};
