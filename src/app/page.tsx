import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        {/* Services */}
        <section id="services" className="min-h-screen px-6 py-32">
          <h2 className="font-headline text-3xl font-bold text-on-surface md:text-5xl">
            Services
          </h2>
        </section>

        {/* Projects */}
        <section id="projects" className="min-h-screen px-6 py-32">
          <h2 className="font-headline text-3xl font-bold text-on-surface md:text-5xl">
            Projects
          </h2>
        </section>

        {/* About */}
        <section id="about" className="min-h-screen px-6 py-32">
          <h2 className="font-headline text-3xl font-bold text-on-surface md:text-5xl">
            About
          </h2>
        </section>

        {/* Contact */}
        <section id="contact" className="min-h-screen px-6 py-32">
          <h2 className="font-headline text-3xl font-bold text-on-surface md:text-5xl">
            Contact
          </h2>
        </section>

        {/* Footer */}
        <footer className="border-t border-outline-variant/10 px-6 py-16">
          <p className="text-sm text-on-surface-variant">
            &copy; 2026 Nova Sigil. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
