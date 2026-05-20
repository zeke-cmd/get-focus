"use client";

import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulated — replace with real endpoint
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="waitlist" className="relative border-t border-black">
      {/* Label */}
      <div className="border-b border-black px-6 py-2">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
          system_05 — access
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — CTA copy */}
          <div>
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-[-0.04em] uppercase"
              style={{ fontFamily: "var(--font-unbounded)" }}
            >
              TRY
              <br />
              THE
              <br />
              <span className="text-neutral-400">BETA</span>
            </h2>
            <p
              className="mt-8 text-sm leading-relaxed text-neutral-600 max-w-sm"
              style={{ fontFamily: "var(--font-josefin)" }}
            >
              One-time purchase. No account required. No data leaves your
              device. Enter your email to get the APK download link — we'll
              only use it to notify you about v1.0 launch.
            </p>

            {/* Social proof */}
            <div className="mt-10 flex gap-8">
              {[
                { val: "2,847", label: "beta_users" },
                { val: "4.8★", label: "avg_rating" },
                { val: "0", label: "data_collected" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-2xl tracking-tight"
                    style={{ fontFamily: "var(--font-unbounded)" }}
                  >
                    {s.val}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="border border-black">
            <div className="border-b border-black px-5 py-2 flex justify-between items-center">
              <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500">
                download_form.exe
              </span>
              <span className="font-mono text-[10px] text-neutral-400">
                {submitted ? "status: complete" : "status: waiting"}
              </span>
            </div>

            <div className="p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-2">
                      email_address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-black px-4 py-3 text-sm bg-transparent outline-none placeholder:text-neutral-300 focus:bg-neutral-50 transition-colors"
                      style={{ fontFamily: "var(--font-josefin)" }}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-2">
                      platform
                    </label>
                    <div className="flex gap-0">
                      {["Android (APK)", "iOS (coming soon)"].map((p, i) => (
                        <button
                          type="button"
                          key={p}
                          className={`flex-1 border border-black px-4 py-3 text-xs transition-colors ${
                            i === 0
                              ? "bg-black text-white"
                              : "bg-transparent text-neutral-400 cursor-not-allowed"
                          }`}
                          style={{ fontFamily: "var(--font-josefin)" }}
                          disabled={i === 1}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full border border-black bg-black text-white py-4 text-sm uppercase tracking-[0.3em] hover:bg-neutral-900 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "var(--font-unbounded)" }}
                  >
                    {loading ? "Processing..." : "Get Download Link →"}
                  </button>

                  <p className="font-mono text-[9px] text-neutral-400 text-center leading-relaxed">
                    No spam. No tracking. Just the APK link + v1.0 launch
                    notification.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div
                    className="text-4xl tracking-tight"
                    style={{ fontFamily: "var(--font-unbounded)" }}
                  >
                    ✓
                  </div>
                  <p
                    className="text-lg"
                    style={{ fontFamily: "var(--font-josefin)" }}
                  >
                    You're in. Download below.
                  </p>

                  <a
                    href="https://github.com/zeke-cmd/get-focus/releases/download/v0.1.0-beta/get-focus-v0.1.0.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-black bg-black text-white px-8 py-4 text-sm uppercase tracking-[0.3em] hover:bg-neutral-900 transition-colors"
                    style={{ fontFamily: "var(--font-unbounded)" }}
                  >
                    Download APK
                  </a>

                  <p className="font-mono text-[10px] text-neutral-400">
                    file: get-focus-v0.1.0.apk — size: ~24MB — requires:
                    Android 8.0+
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
