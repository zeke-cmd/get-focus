import { Nav } from "../components/nav";
import { Hero } from "../components/hero";
import { StatsBar } from "../components/stats-bar";
import { Manifesto } from "../components/manifesto";
import { Features } from "../components/features";
import { Testimonials } from "../components/testimonials";
import { Waitlist } from "../components/waitlist";
import { Footer } from "../components/footer";

export default function Index() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <StatsBar />
      <Manifesto />
      <Features />
      <Testimonials />
      <Waitlist />
      <Footer />
    </main>
  );
}
