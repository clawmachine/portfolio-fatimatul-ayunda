import Nav from '@/components/layout/Nav/Nav';
import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Services from '@/components/sections/Services/Services';
import Tools from '@/components/sections/Tools/Tools';
import Process from '@/components/sections/Process/Process';
import SelectedWork from '@/components/sections/SelectedWork/SelectedWork';
import Experience from '@/components/sections/Experience/Experience';
import Contact from '@/components/sections/Contact/Contact';
import Footer from '@/components/layout/Footer/Footer';

// Urutan akhir: Nav → Hero → About → Services (+ Tools + Process) → Selected Work → Experience → Contact → Footer.
export default function Home() {
  return (
    <>
      <main id="top" style={{ position: 'relative' }}>
        <Nav />
        <Hero />
        <About />
        <Services />
        <Tools />
        <Process />
        <SelectedWork />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
