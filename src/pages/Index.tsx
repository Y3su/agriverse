import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarketplaceSection } from "@/components/sections/MarketplaceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { AgriBot } from "@/components/chatbot/AgriBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AnnouncementBanner />
      <HeroSection />
      <MarketplaceSection />
      <AboutSection />
      <FAQSection />
      <Footer />
      <AgriBot />
    </div>
  );
};

export default Index;
