import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ScrollTransitions } from "@/lib/ScrollTransitions";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollTransitions />

      <main id="main">
        <div style={{ perspective: "1200px" }}>
          <Hero />
        </div>
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
