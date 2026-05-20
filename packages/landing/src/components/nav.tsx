"use client";

import { useState, useEffect } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fafafa]/95 backdrop-blur-sm border-b border-[#0a0a0a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-base tracking-tight uppercase font-semibold"
            style={{ fontFamily: "Unbounded" }}
          >
            focus
          </a>
          <span className="text-[10px] text-[#a3a3a3] tracking-wider" style={{ fontFamily: "Montserrat" }}>
            · beta_v.01
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.15em] text-[#737373]" style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
          <a href="#features" className="hover:text-[#0a0a0a] transition-colors">features</a>
          <a href="#manifesto" className="hover:text-[#0a0a0a] transition-colors">manifesto</a>
          <a href="#waitlist" className="hover:text-[#0a0a0a] transition-colors">waitlist</a>
        </div>

        <a
          href="#waitlist"
          className="bg-[#0a0a0a] text-[#fafafa] px-5 py-2 text-[11px] uppercase tracking-[0.15em] hover:bg-[#262626] transition-colors"
          style={{ fontFamily: "Montserrat", fontWeight: 600 }}
        >
          get access
        </a>
      </div>
    </nav>
  );
}
