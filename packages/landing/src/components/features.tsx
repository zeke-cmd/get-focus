"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    code: "system_01",
    title: "task engine",
    description:
      "create, prioritize, tag, and schedule. swipe to delete. tap to edit. notes on every task. zero friction.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    code: "timer_02",
    title: "deep work timer",
    description:
      "pomodoro with custom intervals. track daily focus hours. break cycles that actually work.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2 2M12 5V3M9 3h6" />
      </svg>
    ),
  },
  {
    code: "habit_03",
    title: "streak builder",
    description:
      "daily check-ins. visual streaks. build consistency one day at a time. no gamification nonsense.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    code: "journal_04",
    title: "daily journal",
    description:
      "one entry per day. dump thoughts. plan ahead. your private space to think — never synced anywhere.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />
      </svg>
    ),
  },
  {
    code: "save_05",
    title: "bookmark vault",
    description:
      "save links, articles, resources. categorize, tag, favorite. find anything instantly.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
  },
  {
    code: "interface_06",
    title: "gym tracker",
    description:
      "log workouts, exercises, sets & reps. track weight over time. simple enough to use between sets.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M6.5 6.5h11M6.5 17.5h11M3 10h2v4H3zM19 10h2v4h-2zM5 8h2v8H5zM17 8h2v8h-2z" />
      </svg>
    ),
  },
];

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
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
    <div
      ref={ref}
      className={`group border border-[#e5e5e5] p-8 md:p-10 hover:border-[#0a0a0a] transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* code label */}
      <div className="flex items-center justify-between mb-8">
        <span
          className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3]"
          style={{ fontFamily: "Montserrat" }}
        >
          {feature.code}
        </span>
        <div className="text-[#d4d4d4] group-hover:text-[#0a0a0a] transition-colors duration-300">
          {feature.icon}
        </div>
      </div>

      {/* title */}
      <h3
        className="text-xl md:text-2xl uppercase tracking-tight mb-4"
        style={{ fontFamily: "Unbounded", fontWeight: 600 }}
      >
        {feature.title}
      </h3>

      {/* description */}
      <p
        className="text-[#737373] text-sm leading-relaxed"
        style={{ fontFamily: "JosefinSans" }}
      >
        {feature.description}
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-[#fafafa] border-t border-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
        {/* section header */}
        <div className="flex items-center gap-3 mb-16">
          <span
            className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3]"
            style={{ fontFamily: "Montserrat" }}
          >
            features
          </span>
          <div className="flex-1 h-[1px] bg-[#e5e5e5]" />
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {features.map((feature, i) => (
            <FeatureCard key={feature.code} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
