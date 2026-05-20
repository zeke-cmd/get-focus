import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "finally, a productivity app that doesn't try to be a social network. just works.",
    name: "arjun mehta",
    handle: "@arjun_dev",
    avatar: "AM",
  },
  {
    quote: "the fact that nothing leaves my phone is a game changer. this is how apps should be built.",
    name: "priya sharma",
    handle: "@priya_builds",
    avatar: "PS",
  },
  {
    quote: "deleted 4 apps after installing focus. tasks, journal, pomodoro, gym — all in one. lightweight as hell.",
    name: "rahul krishnan",
    handle: "@rahul_k",
    avatar: "RK",
  },
  {
    quote: "no sign up screen. no onboarding funnel. just opened it and started using it. respect.",
    name: "sneha patel",
    handle: "@sneha_ux",
    avatar: "SP",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#0a0a0a] text-[#fafafa] border-t border-[#262626]" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex items-center gap-3 mb-16">
          <span
            className="text-[10px] uppercase tracking-[0.2em] text-[#525252]"
            style={{ fontFamily: "Montserrat" }}
          >
            beta_testers
          </span>
          <div className="flex-1 h-[1px] bg-[#262626]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`border border-[#262626] p-8 md:p-10 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <p
                className="text-lg md:text-xl leading-relaxed mb-8"
                style={{ fontFamily: "JosefinSans" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[11px] text-[#737373] uppercase"
                  style={{ fontFamily: "Montserrat", fontWeight: 700 }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    className="text-sm uppercase tracking-wide"
                    style={{ fontFamily: "Montserrat", fontWeight: 600 }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-[11px] text-[#525252]"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {t.handle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
