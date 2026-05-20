"use client";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] text-[#fafafa] overflow-hidden noise flex flex-col">
      {/* giant fragmented typography */}
      <div className="flex-1 flex items-center justify-center px-6 pt-14">
        <div className="w-full max-w-[1400px] mx-auto">
          {/* row 1 */}
          <div className="flex items-end justify-between gap-4 md:gap-8">
            <h1
              className="text-[clamp(4rem,15vw,14rem)] leading-[0.85] tracking-tighter uppercase anim-fade-up d1"
              style={{ fontFamily: "Unbounded", fontWeight: 700 }}
            >
              fo
            </h1>
            <div className="hidden md:block flex-1 h-[2px] bg-[#333] mb-8 anim-fade-in d3" />
            <h1
              className="text-[clamp(4rem,15vw,14rem)] leading-[0.85] tracking-tighter uppercase anim-fade-up d2"
              style={{ fontFamily: "Unbounded", fontWeight: 700 }}
            >
              cus
            </h1>
          </div>

          {/* tagline row */}
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <p
              className="text-[#737373] text-sm md:text-base max-w-[380px] leading-relaxed anim-fade-up d4"
              style={{ fontFamily: "JosefinSans" }}
            >
              the anti-productivity app. no cloud. no subscriptions. 
              no distractions. just you and your tasks — running 
              entirely on your device.
            </p>

            <div className="flex items-center gap-6 anim-fade-up d5">
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] mb-1" style={{ fontFamily: "Montserrat" }}>
                  early_private_access
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252]" style={{ fontFamily: "Montserrat" }}>
                  limited_beta_cohort
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar — join beta + countdown style */}
      <div className="border-t border-[#262626] anim-fade-up d6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252]" style={{ fontFamily: "Montserrat" }}>
            enter_email
          </span>

          <a
            href="#waitlist"
            className="border border-[#fafafa] text-[#fafafa] px-8 py-3 text-[12px] uppercase tracking-[0.2em] hover:bg-[#fafafa] hover:text-[#0a0a0a] transition-all duration-200"
            style={{ fontFamily: "Montserrat", fontWeight: 600 }}
          >
            join beta
          </a>

          <div className="flex items-center gap-2">
            <div className="flex gap-1 text-[#fafafa]" style={{ fontFamily: "Unbounded", fontWeight: 300 }}>
              <span className="bg-[#1a1a1a] px-3 py-2 text-lg">0</span>
              <span className="bg-[#1a1a1a] px-3 py-2 text-lg">0</span>
              <span className="text-[#525252] self-center text-xs mx-0.5">:</span>
              <span className="bg-[#1a1a1a] px-3 py-2 text-lg">0</span>
              <span className="bg-[#1a1a1a] px-3 py-2 text-lg">0</span>
              <span className="text-[#525252] self-center text-xs mx-0.5">:</span>
              <span className="bg-[#1a1a1a] px-3 py-2 text-lg">0</span>
              <span className="bg-[#1a1a1a] px-3 py-2 text-lg">0</span>
            </div>
          </div>

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] text-right" style={{ fontFamily: "Montserrat" }}>
            free_private_access<br />
            no_credit_card_req
          </span>
        </div>
      </div>
    </section>
  );
}
