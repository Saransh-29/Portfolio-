import ParticleBackground from '@/components/canvas/ParticleBackground';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Achievements from '@/components/sections/Achievements';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed canvas particle layer */}
      <ParticleBackground />

      {/* Phase 1 */}
      <Hero />

      {/* Phase 2 */}
      <About />
      <TechStack />
      <Skills />

      {/* Phase 3 */}
      <Projects />
      <Experience />

      {/* Phase 4 (coming) */}
      {/* <Achievements /> */}
      <Achievements />
      {/* <Certifications /> */}
      {/* <Contact /> */}
      <Contact />
    </main>
  );
}
