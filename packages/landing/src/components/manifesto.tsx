"use client";

import { useEffect, useRef, useState } from "react";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="manifesto" className="bg-[#fafafa]" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* left — big statement */}
          <div>
            <h2
              className={`text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.0] tracking-tight uppercase transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFamily: "Unbounded", fontWeight: 600 }}
            >
              stop
              <br />
              subscribing.
              <br />
              start
              <br />
              owning.
            </h2>
          </div>

          {/* right — description + stats */}
          <div className="flex flex-col justify-between">
            <div>
              <p
                className={`text-[clamp(1rem,1.8vw,1.35rem)] leading-[1.5] uppercase tracking-wide mb-8 transition-all duration-700 delay-200 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ fontFamily: "Montserrat", fontWeight: 600 }}
              >
                the productivity app for people who hate productivity apps. 
                everything runs on your phone. your data never touches a server. 
                no accounts, no sync, no bullshit.
              </p>

              <p
                className={`text-[#737373] text-sm leading-relaxed max-w-[480px] transition-all duration-700 delay-300 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ fontFamily: "JosefinSans" }}
              >
                seven tools in one app — tasks, pomodoro timer, habit tracker, 
                daily journal, bookmarks, gym tracker, and focus intentions. 
                all stored locally in sqlite. works offline, always.
              </p>
            </div>

            {/* stats */}
            <div
              className={`flex items-end gap-10 mt-12 transition-all duration-700 delay-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] mb-2" style={{ fontFamily: "Montserrat" }}>
                  waitlisted
                </div>
                <div className="text-4xl md:text-5xl tracking-tight" style={{ fontFamily: "Unbounded", fontWeight: 300 }}>
                  1,248
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] mb-2" style={{ fontFamily: "Montserrat" }}>
                  spots_left
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl tracking-tight bg-[#0a0a0a] text-[#fafafa] px-3 py-1" style={{ fontFamily: "Unbounded", fontWeight: 600 }}>
                    12
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
