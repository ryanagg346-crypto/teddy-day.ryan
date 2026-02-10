import TeddyCursor from '@/components/TeddyCursor';
import FloatingElements from '@/components/FloatingElements';
import HeroSection from '@/components/HeroSection';
import TeddyGallery from '@/components/TeddyGallery';
import CuddleMessage from '@/components/CuddleMessage';
import GiftBox from '@/components/GiftBox';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Custom Cursor */}
      <TeddyCursor />
      
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <TeddyGallery />
        <CuddleMessage />
        <GiftBox />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
