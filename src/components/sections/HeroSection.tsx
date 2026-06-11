import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay - stronger on mobile for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 md:from-background/90 md:via-background/60 md:to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-4xl">
          <div className="space-y-5 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              {t("hero.title1")}
              <br />
              <span className="text-primary">{t("hero.title2")}</span>
              <br />
              {t("hero.title3")}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-agricultural-dark hover:from-agricultural-dark hover:to-primary text-primary-foreground px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold shadow-hero transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  {t("hero.exploreMarketplace")}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              
              <Link to="/about" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold transition-all duration-300"
                >
                  {t("hero.learnMore")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}