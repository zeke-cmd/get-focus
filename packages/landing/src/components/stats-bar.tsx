"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export function StatsBar() {
  const items = [
    "tasks",
    "pomodoro",
    "habits",
    "journal",
    "bookmarks",
    "gym",
    "focus timer",
    "notes",
    "offline",
    "zero tracking",
    "local only",
    "no cloud",
  ];

  return (
    <>
      {/* ticker */}
      <div className="border-b border-[#0a0a0a] py-3 overflow-hidden bg-[#fafafa]">
        <div className="flex anim-ticker whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="mx-6 text-[11px] uppercase tracking-[0.2em] text-[#a3a3a3] flex items-center gap-6"
              style={{ fontFamily: "Montserrat", fontWeight: 500 }}
            >
              {item}
              <span className="text-[#d4d4d4]">·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
