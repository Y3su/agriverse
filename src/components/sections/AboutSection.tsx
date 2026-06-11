import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import farmingImage from "@/assets/farming-equipment.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();
  const benefits = [
    {
      titleKey: "about.benefit1",
      descKey: "about.benefit1Desc",
      color: "bg-agricultural-light"
    },
    {
      titleKey: "about.benefit2", 
      descKey: "about.benefit2Desc",
      color: "bg-harvest/20"
    },
    {
      titleKey: "about.benefit3",
      descKey: "about.benefit3Desc",
      color: "bg-earth/20"
    },
    {
      titleKey: "about.benefit4",
      descKey: "about.benefit4Desc",
      color: "bg-agricultural-light"
    }
  ];

  return (
    <section className="py-20 bg-agricultural/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <Badge variant="secondary" className="absolute top-4 left-4 z-10 bg-background/90 text-foreground">
              {t("about.badge")}
            </Badge>
            <div className="relative overflow-hidden rounded-3xl shadow-hero">
              <img 
                src={farmingImage} 
                alt="Modern farming equipment" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {t("about.title1")}
                <br />
                <span className="text-primary">{t("about.title2")}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.description")}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className={`p-6 ${benefit.color} border-0 shadow-soft hover:shadow-card transition-all duration-300`}>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{t(benefit.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(benefit.descKey)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}