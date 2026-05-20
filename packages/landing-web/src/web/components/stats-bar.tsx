export function StatsBar() {
  const items = [
    "tasks", "pomodoro", "habits", "journal", "bookmarks", "gym",
    "focus timer", "notes", "offline", "zero tracking", "local only", "no cloud",
  ];

  return (
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
  );
}
