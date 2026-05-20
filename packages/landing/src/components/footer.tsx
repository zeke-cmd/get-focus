export default function Footer() {
  return (
    <footer className="border-t border-black">
      {/* Top bar — links */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-black">
        {[
          {
            title: "product",
            links: ["Features", "Pricing", "Changelog", "Roadmap"],
          },
          {
            title: "resources",
            links: ["Documentation", "Privacy Policy", "Terms of Use", "FAQ"],
          },
          {
            title: "community",
            links: ["GitHub", "Discord", "Twitter/X", "Reddit"],
          },
          {
            title: "company",
            links: ["About", "Blog", "Contact", "Press Kit"],
          },
        ].map((col, i) => (
          <div
            key={col.title}
            className={`p-6 ${i < 3 ? "border-r border-black" : ""}`}
          >
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4">
              {col.title}
            </div>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-xs hover:text-neutral-500 transition-colors"
                    style={{ fontFamily: "var(--font-josefin)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Middle — manifesto line */}
      <div className="border-b border-black px-6 py-8 text-center">
        <p
          className="text-[clamp(1rem,2.5vw,1.5rem)] tracking-[-0.02em] uppercase"
          style={{ fontFamily: "var(--font-unbounded)" }}
        >
          Your phone. Your rules.{" "}
          <span className="text-neutral-400">No exceptions.</span>
        </p>
      </div>

      {/* Bottom bar */}
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span
            className="text-sm tracking-[-0.02em] uppercase"
            style={{ fontFamily: "var(--font-unbounded)" }}
          >
            FOCUS
          </span>
          <span className="font-mono text-[10px] text-neutral-400">
            v0.1.0-beta
          </span>
        </div>

        <div className="font-mono text-[10px] text-neutral-400 tracking-[0.1em]">
          © 2026 FOCUS — All rights reserved — Made with intent
        </div>

        <div className="flex items-center gap-4">
          {["GitHub", "Twitter", "Discord"].map((s) => (
            <a
              key={s}
              href="#"
              className="font-mono text-[10px] tracking-[0.1em] text-neutral-400 hover:text-black transition-colors uppercase"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
