import CateringV2 from '@/components/mainPageSections/CateringV2';
import About from '@/components/mainPageSections/About';
import CallToAction from '@/components/mainPageSections/CallToAction';
import Catering from '@/components/mainPageSections/Catering';
import Gallery from '@/components/mainPageSections/Gallery';
import Hero from '@/components/mainPageSections/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      {/* <Catering /> */}
      <CateringV2 />
      <Gallery />
      <CallToAction />
    </main>
  );
}
