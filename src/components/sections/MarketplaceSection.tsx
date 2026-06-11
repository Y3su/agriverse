import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import vegetablesImage from "@/assets/marketplace-vegetables.jpg";
import fruitsImage from "@/assets/marketplace-fruits.jpg";
import livestockImage from "@/assets/livestock-farming.jpg";
import grainImage from "@/assets/grain-products.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function MarketplaceSection() {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-b from-background to-agricultural-light/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {t("marketplace.sectionTitle")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("marketplace.description")}
              </p>
            </div>
            
            <Button 
              size="lg"
              className="bg-primary hover:bg-agricultural-dark text-primary-foreground px-8 py-4 text-lg font-semibold shadow-card transition-all duration-300 hover:shadow-lg hover:scale-105"
              asChild
            >
              <Link to="/marketplace">
                {t("marketplace.sectionTitle")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div 
                className="aspect-square bg-cover bg-center relative"
                style={{ backgroundImage: `url(${vegetablesImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-overlay" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">20+</h3>
                    <p className="text-lg font-semibold">{t("marketplace.vegetables")}</p>
                    <p className="text-sm opacity-90">{t("marketplace.vegetablesDesc")}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div 
                className="aspect-square bg-cover bg-center relative"
                style={{ backgroundImage: `url(${fruitsImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-overlay" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">20+</h3>
                    <p className="text-lg font-semibold">{t("marketplace.fruits")}</p>
                    <p className="text-sm opacity-90">{t("marketplace.fruitsDesc")}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div 
                className="aspect-square bg-cover bg-center relative"
                style={{ backgroundImage: `url(${livestockImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-overlay" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">15+</h3>
                    <p className="text-lg font-semibold">{t("marketplace.livestock")}</p>
                    <p className="text-sm opacity-90">{t("marketplace.livestockDesc")}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div 
                className="aspect-square bg-cover bg-center relative"
                style={{ backgroundImage: `url(${grainImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-overlay" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">30+</h3>
                    <p className="text-lg font-semibold">{t("marketplace.grain")}</p>
                    <p className="text-sm opacity-90">{t("marketplace.grainDesc")}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}